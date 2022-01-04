import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { startUndoable, useTranslate } from 'react-admin';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ITCrudDeleteMany } from '../../configurations/actions/CrudActions';

const MyDeleteManyButton = (props) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const dispatchCrudDeleteMany = ITCrudDeleteMany;
    const {
        basePath, resource, selectedIds, undoable, onClick
    } = props;
    const resourceName = translate(`resources.${resource}.name`);
    const disabled = selectedIds.length === 0;

    const handleClick = () => {
        if (undoable) {
            dispatch(startUndoable(dispatchCrudDeleteMany({
                resource, ids: selectedIds, basePath, resourceName
            })));
        } else {
            dispatchCrudDeleteMany({
                resource, ids: selectedIds, basePath, resourceName
            });
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    return (
        <button
            type="button"
            className={classNames('btn', 'btn-itech', disabled ? 'btn-itech-secondary' : 'btn-primary')}
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

export default MyDeleteManyButton;
