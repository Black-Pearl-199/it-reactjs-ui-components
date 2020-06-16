import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React from 'react';

const MyBackButton = ({ history, basePath }) => {
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

export default MyBackButton;
