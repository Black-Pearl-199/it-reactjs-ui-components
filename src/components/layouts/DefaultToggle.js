import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func } from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

const DefaultToggle = (props) => {
    const { toggleCollapse } = props;
    return (
        <div className="w-100">
            <Button variant="default" onClick={toggleCollapse} className="toggle-collapse mx-auto px-0">
                <FontAwesomeIcon icon={faBars} />
            </Button>
        </div>
    );
};

DefaultToggle.propTypes = {
    toggleCollapse: func
};

export default DefaultToggle;
