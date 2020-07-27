/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import isReact from 'is-react';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Field } from 'react-final-form';
import { useSelector } from 'react-redux';

import { getLoading } from '../../configurations/selectors';

export const MyTextInput = (props) => <MyCustomInput {...props} component="input" />;

const composeValidators = (validators) => (value, allValues) => validators.reduce((error, validator) => error || validator(value, allValues), undefined);

// formClassName ->> class name for wrapper of this input, default by react-admin -> remove it to not attach on children

export const MyCustomInput = (props) => {
    const {
        optionText = 'name',
        optionValue = 'id',
        hidden,
        validate,
        disabled,
        required,
        skipFormat,
        label,
        placeholder,
        source,
        labelClasses,
        inputClasses,
        groupClasses,
        className,
        basePath,
        hideLabel,
        component,
        choices,
        type,
        allowEmpty,
        original,
        formClassName,
        small,
        ...rest
    } = props;
    const { resource } = rest;
    const loading = useSelector(getLoading);
    const translate = useTranslate();
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);
    // console.log('errors from field', props)
    return (
        <div className={classNames('form-group', groupClasses, hidden ? 'd-none' : null)}>
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>{translatedLabel}</label>
            ) : null}
            <div className={inputClasses}>
                {isReact.component(component) || isReact.element(component) ? (
                    React.cloneElement(component, { resource })
                ) : (
                    <Field
                        name={source}
                        source={source}
                        component={component}
                        type={type}
                        disabled={loading || disabled}
                        required={required}
                        validate={validate ? composeValidators(validate) : null}
                        className={classNames(
                            type !== 'checkbox' ? ['form-control', small ? 'form-control-sm' : '', 'w-100'] : '',
                            className
                        )}
                        title={translatedLabel}
                        placeholder={hideLabel ? translatedLabel : null}
                        {...rest}
                    >
                        {component === 'select' ? (
                            <>
                                {!required && <option value="">{hideLabel ? translatedLabel : null}</option>}
                                {choices.map((choice, index) => (
                                    <option value={choice[optionValue]} key={choice[optionValue]}>
                                        {translate && !skipFormat ? translate(choice[optionText]) : choice[optionText]}
                                    </option>
                                ))}
                            </>
                        ) : null}
                    </Field>
                )}
            </div>
        </div>
    );
};
MyCustomInput.propTypes = {
    allowEmpty: PropTypes.any,
    alwaysOn: PropTypes.any,
    component: PropTypes.any,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    skipFormat: PropTypes.bool,
    choices: PropTypes.arrayOf(PropTypes.object),
    original: PropTypes.bool,
    formClassName: PropTypes.string,
    small: PropTypes.bool,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    hidden: PropTypes.bool,
    validate: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    source: PropTypes.string,
    labelClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    groupClasses: PropTypes.string,
    basePath: PropTypes.string
};
MyCustomInput.defaultProps = {
    skipFormat: true,
    hideLabel: false,
    original: false,
    small: true
};

export const MySelectInput = (props) => {
    const { isRequired, pagination, setPagination, setSort, translateChoice, setFilter, readOnly, ...rest } = props;
    return <MyCustomInput disabled={readOnly} {...rest} component="select" />;
};
MySelectInput.propTypes = {
    choices: PropTypes.array,
    isRequired: PropTypes.bool,
    pagination: PropTypes.object,
    setPagination: PropTypes.func,
    setSort: PropTypes.func,
    translateChoice: PropTypes.bool,
    setFilter: PropTypes.func,
    readOnly: PropTypes.bool
};
