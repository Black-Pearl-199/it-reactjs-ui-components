import React, { useEffect, useRef, useState } from 'react';
import { stringify } from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { changeListParams, showNotification, useTranslate } from 'ra-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';
import { Button } from 'react-bootstrap';
import { ITCrudGetList } from '../../configurations/actions';
import { inputValidate } from '../../configurations/validation';
import { hasCustomParams, selectQuery } from '../../utils';

const SORT_DESC = 'DESC';
const sanitizeRestProps = ({ initFilter, permissions, pagination, options, history, match, basePath, hasList, hasCreate, hasEdit, hasShow, defaultSort, ...rest }) => rest;

export const MyFilterBox = (props) => {
    const stateProps = useSelector((state) => {
        const resourceState = state.admin.resources[props.resource];
        return {
            query: props.location && selectQuery(props),
            params: resourceState && resourceState.list.params,
            ids: resourceState && resourceState.list.ids,
            loaded: resourceState && resourceState.list.loaded,
            selectedIds: resourceState && resourceState.list.selectedIds,
            total: resourceState && resourceState.list.total,
            data: resourceState && resourceState.data,
            loading: state.admin.loading > 0,
            version: state.admin.ui.viewVersion
        };
    });
    const { query, params, loading } = stateProps;

    const queryFormat = Object.keys(query).length > 0 ? query : hasCustomParams(params) ? { ...params } : { filter: props.initFilter || {} };
    const { filter } = queryFormat;
    const [form, setForm] = useState(filter || props.initFilter);
    const formRef = useRef();
    const dispatch = useDispatch();
    const translate = useTranslate();
    const { hasClear, children, className, buttonClasses, initData, defaultSort, permanentFilter, ...rest } = props;

    useEffect(() => {
        const { initData } = props;
        if (initData) {
            onSubmit(undefined, true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e, component, type) => {
        // console.log('my filter box update', e, component, type);
        setForm({ ...form, ...e });
        if (component !== 'input' || type !== 'text') onSubmit();
    };

    const checkFormValidate = () => {
        if (!form) {
            return false;
        }

        const names = Object.keys(form);
        const invalid = {};
        try {
            for (const name of names) {
                const value = form[name];
                if (value && typeof value === 'string' && value.length > 0 && inputValidate[name] !== undefined && inputValidate[name].pattern) {
                    const { pattern } = inputValidate[name];
                    if (value.match(pattern)) {
                        //
                    } else {
                        invalid[name] = `commons.message.invalid.${name}`;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }

        const formValidated = isEmpty(invalid);
        if (!formValidated) {
            const message = Object.values(invalid).map((msg) => translate(msg)).join('\n');
            dispatch(showNotification('commons.message.error', 'warning', { messageArgs: { error: message } }));
        }
        return formValidated;
    };

    const onSubmit = debounce((e, firstInit) => {
        if (e) e.preventDefault();
        if (!checkFormValidate()) return;

        const { initFilter, defaultSort, convertValue, resource } = props;
        let filter = {};
        const formFormat = convertValue ? convertValue(form) : form;

        Object.keys(formFormat).forEach((field) => {
            const value = formFormat[field];
            if (value) filter[field] = value;
        });

        if (isEmpty(filter) && firstInit) filter = initFilter;
        filter = { ...filter, ...permanentFilter };
        const { field: defaultSortField, order: defaultSortOrder } = defaultSort;

        const { page = 1, perPage = 10, sort = defaultSortField, order = defaultSortOrder } = query;
        const pagination = {
            page,
            perPage
        };
        const sortQuery = {
            field: sort,
            order
        };

        const newParams = { ...pagination, sort, order, filter };
        const search = stringify({ filter: JSON.stringify(filter), ...pagination, sort, order });
        const { history, location } = props;
        if (history && location) {
            const currentSearchStr = JSON.parse(JSON.stringify(location)).search;
            const searchEqual = currentSearchStr === `?${search}`;
            const newLocation = Object.assign(location, { search });
            history.push(newLocation);
            dispatch(changeListParams(resource, newParams));

            // search ko update thì là refresh page
            if (searchEqual) {
                const crudGetListParams = { resource, pagination, sort: sortQuery, filter };
                dispatch(ITCrudGetList(crudGetListParams));
            }
        }
    }, 500);

    const formEnter = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const resetFilter = () => {
        const resetState = {};
        Object.keys(form).forEach((name) => {
            resetState[name] = undefined;
        });
        setForm({ ...resetState });
    };

    // const resetInput = (name, value) => {
    //     setForm({ ...form, [name]: value });
    // };

    const onKeyPressed = (e) => {
        const { charCode } = e;
        if (charCode === 13) {
            e.preventDefault();
            onSubmit();
        }
    };

    const sanitizeProps = { ...sanitizeRestProps(rest), onInputChange: onChange };
    const renderChildren = React.Children.map(children, (child) => React.cloneElement(child, {
        ...sanitizeProps,
        submit: onSubmit,
        inputValue: form,
        onKeyPress: onKeyPressed
    }));
        // 'card', 'panel-itech',
    return (
        <Form onSubmit={formEnter}>
            {() => (
                <form onSubmit={onSubmit} ref={formRef} className={classNames('row', 'my-1', className)}>
                    <div className="d-flex flex-wrap w-100">
                        {renderChildren}
                        <div
                            className={buttonClasses || `col align-self-sm-center ${hasClear ? 'justify-content-around' : ''} row`}
                        >
                            {hasClear ? (
                                <div className="col-form-label mr-3">
                                    <Button
                                        variant="itech"
                                        className="btn-itech-secondary"
                                        type="reset"
                                        disabled={loading}
                                        size="sm"
                                        onClick={resetFilter}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEraser}
                                        />
                                        {translate('button.clear')}
                                    </Button>
                                </div>
                            )
                                : ''}
                            <div className="col-form-label">
                                <Button
                                    variant="itech"
                                    disabled={loading}
                                    size="sm"
                                    onClick={formEnter}
                                    className="btn-itech-primary float-md-right float-lg-none"
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                    {translate('button.search')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Form>
    );
};

MyFilterBox.propTypes = {
    initFilter: PropTypes.object,
    permanentFilter: PropTypes.object,
    buttonClasses: PropTypes.string,
    initData: PropTypes.bool,
    defaultSort: PropTypes.shape({ field: PropTypes.string, order: PropTypes.oneOf(['ASC', 'DESC']) }),
    convertValue: PropTypes.func,
    resource: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    hasClear: PropTypes.bool
};

MyFilterBox.defaultProps = {
    initFilter: {},
    permanentFilter: {},
    initData: false,
    defaultSort: { field: 'id', order: SORT_DESC }
};
