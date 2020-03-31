import React from 'react';
import { compose } from 'recompose';
import { translate } from 'ra-core';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const enhance = compose(translate);

export const MyRadioGroupInput = enhance((props) => {
    const { translate, name, choices, inline, type, onInputChange, inputValue, groupClasses, className, skipFormat, ...rest } = props;

    const onChange = (e) => {
        // console.log('radio group change value', e.target.value);
        onInputChange({ [name]: JSON.parse(e.target.value) });
    };

    return (
        <div className={groupClasses} {...rest}>
            {choices.map((choice) => {
                const id = `${name}-${choice.id}`;
                // console.log(choice.name, choice.value, inputValue, choice.value === inputValue);
                return (
                    <div
                        key={choice.id}
                        className={classNames('custom-control', `custom-${type}`, inline ? 'custom-control-inline' : undefined)}
                    >
                        <input
                            className="custom-control-input"
                            type={type}
                            name={name}
                            id={id}
                            checked={inputValue === choice.value}
                            onChange={onChange}
                            value={choice.value}
                        />
                        <label
                            htmlFor={id}
                            className="custom-control-label no-select"
                        >
                            {skipFormat ? choice.name : translate(choice.name)}
                        </label>
                    </div>
                );
            })}
        </div>
    );
});

MyRadioGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        value: PropTypes.any,
        name: PropTypes.string
    }).isRequired),
    skipFormat: PropTypes.bool,
    inline: PropTypes.bool,
    type: PropTypes.oneOf(['radio', 'check']),
    groupClasses: PropTypes.string,
    inputValue: PropTypes.any,
    onInputChange: PropTypes.func.isRequired,
    name: PropTypes.string
};
MyRadioGroupInput.defaultProps = {
    type: 'radio',
    skipFormat: true
};
