import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { debounce, isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { stringify } from 'query-string';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { changeListParams, showNotification, useTranslate } from 'react-admin';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ITCrudGetList } from '../../configurations/actions';
// import { inputValidate } from '../../configurations/validation';
import { hasCustomParams, selectQuery } from '../../utils';

const SORT_DESC = 'DESC';
const sanitizeRestProps = ({
    initFilter,
    permissions,
    pagination,
    options,
    history,
    match,
    basePath,
    hasList,
    hasCreate,
    hasEdit,
    hasShow,
    defaultSort,
    ...rest
}) => rest;

const MyFilterBox = (props) => {
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

    let queryFormat;
    if (Object.keys(query).length > 0) queryFormat = query;
    else if (hasCustomParams(params)) queryFormat = { ...params };
    else queryFormat = { filter: props.initFilter || {} };
    // const queryFormat = Object.keys(query).length > 0 ? query : hasCustomParams(params) ? { ...params } : { filter: props.initFilter || {} };
    const { filter } = queryFormat;
    // const [form, setForm] = useState(filter || props.initFilter);
    const [form, setForm] = useState({ ...props.initFilter, ...filter });
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();
    const translate = useTranslate();
    const {
        hasClear,
        children,
        className,
        buttonClasses,
        initData,
        defaultSort,
        permanentFilter,
        inputValidate,
        invalidMessagePrefix,
        filterRef,
        ...rest
    } = props;
    console.log('filter box form data', form);
    const setFilter = useCallback((filter) => {
        console.log('set filter', filter);
        setForm(filter);
    }, []);

    useEffect(() => {
        if (filterRef) filterRef.current = { setFilter };
    }, [setFilter, filterRef]);

    const checkFormValidate = () => {
        if (!form) {
            return false;
        }
        if (!inputValidate) return true;
        const invalid = {};
        try {
            Object.keys(form).forEach((name) => {
                const value = form[name];
                if (
                    value
                    && typeof value === 'string'
                    && value.length > 0
                    && inputValidate[name] !== undefined
                    && inputValidate[name].pattern
                ) {
                    const { pattern } = inputValidate[name];
                    if (value.match(pattern)) {
                        //
                    } else {
                        invalid[name] = `${invalidMessagePrefix}.${name}`;
                    }
                }
            });
        } catch (e) {
            // console.error(e);
        }

        const formValidated = isEmpty(invalid);
        if (!formValidated) {
            const message = Object.values(invalid)
                .map((msg) => translate(msg))
                .join('\n');
            dispatch(showNotification('commons.message.error', 'warning', { messageArgs: { error: message } }));
        }
        return formValidated;
    };

    const onSubmit = debounce((e, firstInit) => {
        if (e) e.preventDefault();
        if (checkFormValidate()) {
            const { initFilter, defaultSort, convertValue, resource } = props;
            let filter = {};
            const formFormat = convertValue ? convertValue(form) : form;
            // console.log('formFormat', formFormat);

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

            const newParams = {
                ...pagination,
                sort,
                order,
                filter
            };
            const search = stringify({
                filter: JSON.stringify(filter),
                ...pagination,
                sort,
                order
            });
            const { history, location } = props;
            if (history && location) {
                const currentSearchStr = JSON.parse(JSON.stringify(location)).search;
                const searchEqual = currentSearchStr === `?${search}`;
                const newLocation = Object.assign(location, { search });
                history.push(newLocation);
                dispatch(changeListParams(resource, newParams));

                // search ko update thì là refresh page
                if (searchEqual) {
                    const crudGetListParams = {
                        resource,
                        pagination,
                        sort: sortQuery,
                        filter
                    };
                    dispatch(ITCrudGetList(crudGetListParams));
                }
            }
        }
    }, 500);

    useEffect(() => {
        if (initData) {
            onSubmit(undefined, true);
        }
    }, []);

    useEffect(() => {
        if (triggerSubmit) {
            setTriggerSubmit(false);
            onSubmit();
        }
    }, [triggerSubmit]);

    const onChange = (e, component, type) => {
        // console.log('my filter box update', e, component, type);
        setForm({ ...form, ...e });
        // if (component !== 'input' || type !== 'text') onSubmit();
        if (component !== 'input' || type !== 'text') setTriggerSubmit(true);
    };

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
        <form onSubmit={onSubmit} ref={formRef} className={classNames('row', 'my-1', className)}>
            <div className="d-flex flex-wrap w-100">
                {renderChildren}
                <div className={buttonClasses || `col align-self-sm-center ${hasClear ? 'justify-content-around' : ''} row`}>
                    {hasClear ? (
                        <div className="col-form-label mr-3">
                            <Button
                                variant="itech"
                                className="btn-itech-secondary btn-itech-fixed"
                                type="reset"
                                disabled={loading}
                                size="sm"
                                onClick={resetFilter}
                            >
                                <FontAwesomeIcon icon={faEraser} />
                                &ensp;
                                {translate('button.clear')}
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="col-form-label">
                        <Button
                            variant="itech"
                            disabled={loading}
                            size="sm"
                            onClick={formEnter}
                            className="btn-itech-primary btn-itech-fixed float-md-right float-lg-none"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                            &ensp;
                            {translate('button.search')}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

MyFilterBox.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    initFilter: PropTypes.object,
    permanentFilter: PropTypes.object,
    buttonClasses: PropTypes.string,
    initData: PropTypes.bool,
    defaultSort: PropTypes.shape({ field: PropTypes.string, order: PropTypes.oneOf(['ASC', 'DESC']) }),
    convertValue: PropTypes.func,
    resource: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    hasClear: PropTypes.bool,
    inputValidate: PropTypes.object,
    invalidMessagePrefix: PropTypes.string,
    filterRef: PropTypes.object
};

MyFilterBox.defaultProps = {
    initFilter: {},
    permanentFilter: {},
    initData: false,
    defaultSort: { field: 'id', order: SORT_DESC },
    inputValidate: {},
    invalidMessagePrefix: 'validation.invalid.'
};

export default MyFilterBox;
