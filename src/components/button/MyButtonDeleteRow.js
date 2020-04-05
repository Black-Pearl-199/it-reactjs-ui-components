import React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

export const ButtonDeleteRow = React.memo((props) => {
    const { record, onDelete } = props;
    const onClick = () => {
        onDelete(record);
    };
    return (
        <div className="text-center">
            <Button variant="itech-icon" size="sm" className="btn-itech-icon-primary" onClick={onClick}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    );
});

ButtonDeleteRow.propTypes = {
    record: PropTypes.object,
    onDelete: PropTypes.func
};

ButtonDeleteRow.defaultProps = {
    record: {}
};
