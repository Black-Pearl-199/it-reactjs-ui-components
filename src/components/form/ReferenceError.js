import TextField from '@material-ui/core/TextField';
import * as PropTypes from 'prop-types';
import React from 'react';

const ReferenceError = ({ label, error }) => (
    <TextField error disabled label={label} value={error} margin="normal" />
);

ReferenceError.propTypes = {
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default ReferenceError;
