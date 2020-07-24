import * as PropTypes from 'prop-types';
import React, { useTranslate } from 'react';

const ReferenceError = ({ label, error }) => {
    const translate = useTranslate();
    return (
        <label className="text-danger" disabled>
            {translate(label)}
            :&nbsp;
            {error}
        </label>
    );
};

ReferenceError.propTypes = {
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default ReferenceError;
