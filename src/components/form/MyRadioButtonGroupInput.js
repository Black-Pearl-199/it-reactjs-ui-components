import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withTranslate } from 'ra-core';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { get } from 'lodash';

const mapStateToProps = (state) => ({
    loading: state.admin.loading > 0
});
const enhance = compose(connect(mapStateToProps, {}), withTranslate);

export const MyRadioButtonGroupInput = enhance((props) => {
    const { translate, groupClasses, label, hideLabel, labelClasses, buttonGroupsClasses, buttonClasses, resource, source, input, inputValue, onInputChange, choices, optionValue, optionText, allowEmpty, emptyChoiceLabel, disabled } = props;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);

    const value = input && input.value ? input.value : (inputValue && inputValue[source]);

    const onClick = (e) => {
        const newValue = e.currentTarget.dataset['value'];
        // console.log('new val', newValue);
        if (onInputChange) onInputChange({ [source]: newValue });
        if (input && input.onChange) input.onChange(newValue);
    };

    return (
        <div className={groupClasses}>
            {!hideLabel && (
                <label className={classNames('col-form-label', labelClasses)}>
                    {translatedLabel}
                </label>
            )}
            <div
                className={buttonGroupsClasses}
                role="group"
                aria-label="Select an option"
            >
                {choices.map((choice) => {
                    const choiceValue = get(choice, optionValue);
                    const choiceText = get(choice, optionText);
                    return (
                        <Button
                            key={choiceValue}
                            variant="pick-date"
                            size="sm"
                            disabled={disabled}
                            className={classNames('btn-itech-secondary', value === choiceValue ? 'active' : '', buttonClasses)}
                            onClick={onClick}
                            data-value={choiceValue}
                            type="button"
                        >
                            {translate(choiceText)}
                        </Button>
                    );
                })}
                {allowEmpty && (
                    <Button
                        variant="pick-date"
                        size="sm"
                        disabled={disabled}
                        className={classNames('btn-itech-secondary', !value ? 'active' : '', buttonClasses)}
                        onClick={onClick}
                        type="button"
                    >
                        {translate(emptyChoiceLabel)}
                    </Button>
                )}
            </div>
        </div>
    );
});

MyRadioButtonGroupInput.propsType = {
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    choices: PropTypes.array,
    translateChoice: PropTypes.bool,
    emptyChoiceLabel: PropTypes.string,
    groupClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    buttonGroupsClasses: PropTypes.string,
    buttonClasses: PropTypes.string,
    inputValue: PropTypes.any,
    onInputChange: PropTypes.func,
    optionValue: PropTypes.any,
    optionText: PropTypes.any,
    allowEmpty: PropTypes.bool,
    disabled: PropTypes.bool,
    resource: PropTypes.string,
    source: PropTypes.string,
    input: PropTypes.object
};
MyRadioButtonGroupInput.defaultProps = {
    translateChoice: true,
    optionValue: 'id',
    optionText: 'name',
    allowEmpty: true,
    buttonGroupsClasses: 'group-btn-pick-date'
};
