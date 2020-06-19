import * as PropTypes from 'prop-types';
import React from 'react';

const InputWrapper = ({ children, basePath, className, style, allowEmpty, alwaysOn, formClassName, ...props }) => (
    <div className={className} style={style}>
        {React.Children.map(children, (child) => React.cloneElement(child, { ...props }))}
    </div>
);

InputWrapper.propTypes = {
    allowEmpty: PropTypes.any,
    alwaysOn: PropTypes.any,
    onInputChange: PropTypes.any,
    inputValue: PropTypes.any,
    formClassName: PropTypes.any,
    basePath: PropTypes.string,
    style: PropTypes.any
};

export default InputWrapper;
