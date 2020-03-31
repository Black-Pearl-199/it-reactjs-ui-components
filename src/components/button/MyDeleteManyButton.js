import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { startUndoable, translate } from 'ra-core';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ITCrudDeleteMany } from '../../configurations/actions/CrudActions';

const enhance = compose(
    connect(
        undefined,
        {
            startUndoable,
            dispatchCrudDeleteMany: ITCrudDeleteMany
        }
    ),
    translate
);

export const MyDeleteManyButton = enhance((props) => {
    const { translate, basePath, dispatchCrudDeleteMany, resource, selectedIds, startUndoable, undoable, onClick } = props;
    const resourceName = translate(`resources.${resource}.name`);
    const disabled = selectedIds.length === 0;

    const handleClick = () => {
        if (undoable) {
            startUndoable(dispatchCrudDeleteMany({ resource, ids: selectedIds, basePath, resourceName }));
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
});

MyDeleteManyButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    dispatchCrudDeleteMany: PropTypes.func,
    resource: PropTypes.string,
    startUndoable: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    undoable: PropTypes.bool
};

MyDeleteManyButton.defaultProps = {
    undoable: false
};
