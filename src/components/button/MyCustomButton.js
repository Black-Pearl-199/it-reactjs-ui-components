import React from 'react';
import * as PropTypes from 'prop-types';
import { CardActions, useTranslate } from 'react-admin';
import { useForm } from 'react-final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TabsManager, { TAB_CONTEXT_MAIN } from '../layouts/TabsManager';

export const RedirectCreateButton = (props) => {
    const translate = useTranslate();
    const {
        basePath, resource, path = 'create', label
    } = props;
    return (
        <div className="my-auto">
            <Link
                to={`${basePath}/${path}`}
                className="btn btn-sm btn-shadow btn-itech-dark btn-itech-sm text-decoration-none d-block"
            >
                <FontAwesomeIcon icon={faPlusCircle} />
                &nbsp;
                {label ? translate(label) : (`${translate('ra.action.add')} ${translate(`resources.${resource}.name`)}`)}
            </Link>
        </div>
    );
};

RedirectCreateButton.propTypes = {
    basePath: PropTypes.string,
    resource: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string
};


export const BackMainButton = () => {
    const translate = useTranslate();
    const redirectToMain = (e) => {
        e.preventDefault();
        TabsManager.tabClick(TAB_CONTEXT_MAIN, 'home');
    };
    return (
        <Button
            variant="itech"
            className="btn-itech-fixed btn-itech-secondary mr-3"
            onClick={redirectToMain}
        >
            {translate('button.back')}
        </Button>
    );
};

export const MyBackButton = ({ history, basePath }) => {
    const goBack = () => {
        if (history) {
            history.replace(basePath);
        }
    };
    return (
        <button type="button" className="btn btn-sm btn-secondary" onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );
};

MyBackButton.propTypes = {
    history: PropTypes.object,
    basePath: PropTypes.string
};

export const MyBackEditButton = (props) => {
    const { changeEditState } = props;
    const translate = useTranslate();
    const form = useForm();
    const goBack = () => {
        changeEditState(false);
        form.setConfig('keepDirtyOnReinitialize', false);
        form.reset();
        form.setConfig('keepDirtyOnReinitialize', true);
    };
    return (
        <Button
            variant="itech"
            className="btn btn-itech-secondary btn-itech-fixed mr-3"
            onClick={goBack}
        >
            {translate('button.back')}
        </Button>
    );
};

MyBackEditButton.propTypes = {
    changeEditState: PropTypes.func
};

export const ListActionButtons = (props) => {
    const {
        bulkActionButtons, basePath, displayedFilters, filters, filterValues, onUnselectItems, resource, selectedIds, showFilter
    } = props;
    // currentSort, exporter, total
    return (
        <CardActions>
            {bulkActionButtons && React.cloneElement(bulkActionButtons, {
                basePath,
                filterValues,
                resource,
                selectedIds,
                onUnselectItems,
                test: '1'
            })}
            {filters && React.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button'
            })}
            {/* <MyCreateButton basePath={basePath}/> */}
        </CardActions>
    );
};

ListActionButtons.propTypes = {
    bulkActionButtons: PropTypes.any,
    basePath: PropTypes.string,
    displayedFilters: PropTypes.object,
    filters: PropTypes.object,
    filterValues: PropTypes.object,
    onUnselectItems: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    showFilter: PropTypes.bool
};
