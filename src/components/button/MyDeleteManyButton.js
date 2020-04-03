import React from 'react';
import { useDispatch } from 'react-redux';
import { startUndoable, useTranslate } from 'ra-core';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ITCrudDeleteMany } from '../../configurations/actions/CrudActions';

export const MyDeleteManyButton = (props) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const dispatchCrudDeleteMany = ITCrudDeleteMany;
    const { basePath, resource, selectedIds, undoable, onClick } = props;
    const resourceName = translate(`resources.${resource}.name`);
    const disabled = selectedIds.length === 0;

    const handleClick = () => {
        if (undoable) {
            dispatch(startUndoable(dispatchCrudDeleteMany({ resource, ids: selectedIds, basePath, resourceName })));
        } else {
            dispatchCrudDeleteMany({ resource, ids: selectedIds, basePath, resourceName });
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    return (
        <button
            type="button"
            className={classNames('btn', 'btn-itech', disabled ? 'btn-itech-secondary' : 'btn-itech-primary')}
            disabled={disabled}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={faTrash}
            />
            {translate('button.deleteMany', { resource_name: resourceName })}
        </button>
    );
};

MyDeleteManyButton.propTypes = {
    basePath: PropTypes.string,
    onClick: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    undoable: PropTypes.bool
};

MyDeleteManyButton.defaultProps = {
    undoable: false
};
