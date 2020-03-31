/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import * as PropTypes from 'prop-types';
import { BooleanInput, translate } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import isReact from 'is-react';
import { connect } from 'react-redux';
import { inputStyles } from '../MyCustomStyles';

const mapStateToProps = (state) => ({
    loading: state.admin.loading > 0
});
const enhance = compose(connect(mapStateToProps, {}), translate);

export const MyTextInput = (props) => <MyCustomInput {...props} component="input" />;

const composeValidators = (validators) => (value, allValues) => validators.reduce((error, validator) => error || validator(value, allValues), undefined);

// tạm thời bỏ style={{padding: "0.375rem 0"}} của boolean input
export const MyBooleanInput = compose(withStyles(inputStyles), translate)(({ translate, disabled, required, label, source, labelClasses, inputClasses, groupClasses, className, classes, ...rest }) => {
    const { resource } = rest;
    return (
        <div className={classNames('form-group', groupClasses)}>
            <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>
                {label ? translate(label) : translate(`resources.${resource}.fields.${source}`)}
            </label>
            <div className={inputClasses}>
                <BooleanInput
                    source={source}
                    className={classNames('w-100', className, classes.boolean)}
                    {...rest}
                />
            </div>
        </div>
    );
});

// formClassName ->> class name for wrapper of this input, default by react-admin -> remove it to not attach on children

export const MyCustomInput = enhance((props) => {
    const { optionText = 'name', optionValue = 'id', hidden, validate, translate, loading, disabled, required, skipFormat, label, placeholder, source, labelClasses, inputClasses, groupClasses, className, basePath, hideLabel, component, choices, type, allowEmpty, original, formClassName, small, ...rest } = props;
    const { resource } = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);
    // console.log('errors from field', props)
    return (
        <div className={classNames('form-group', groupClasses, hidden ? 'd-none' : null)}>
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>
                    {translatedLabel}
                </label>
            ) : null}
            <div className={inputClasses}>
                {
                    (isReact.component(component) || isReact.element(component)) ? (React.cloneElement(component, { resource }))
                        : (
                            <Field
                                name={source}
                                source={source}
                                component={component}
                                type={type}
                                disabled={loading || disabled}
                                required={required}
                                validate={validate ? composeValidators(validate) : null}
                                className={classNames(type !== 'checkbox' ? ['form-control', small ? 'form-control-sm' : '', 'w-100'] : '', className)}
                                title={translatedLabel}
                                placeholder={hideLabel ? translatedLabel : null}
                                {...rest}
                            >
                                {component === 'select' ? (
                                    <>
                                        {!required && <option value="">{hideLabel ? translatedLabel : null}</option>}
                                        {choices.map((choice, index) => (
                                            <option
                                                value={choice[optionValue]}
                                                key={index}
                                            >
                                                {translate && !skipFormat ? translate(choice[optionText]) : choice[optionText]}
                                            </option>
                                        ))}
                                    </>
                                ) : null}
                            </Field>
                        )
                }
            </div>
        </div>
    );
});
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
    small: PropTypes.bool
};
MyCustomInput.defaultProps = {
    skipFormat: true,
    hideLabel: false,
    original: false,
    small: true
};

// div tag alternator
export const InputWrapper = ({ children, basePath, className, style, allowEmpty, alwaysOn, formClassName, ...props }) => (
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

export const MyDisabledInput = (props) => {
    const newProps = { ...props, disabled: true };
    return <MyTextInput {...newProps} />;
};

export const MyCustomInputGroup = translate(
    ({ translate, skipFormat, label, placeholder, source, labelClasses, inputClasses, groupClasses, className, basePath, component, choices, allowEmpty, ...rest }) => {
        const { resource } = rest;
        // console.log(resource, label);
        return (
            <div className={classNames('input-group', 'input-group-sm', groupClasses)}>
                <div className="input-group-prepend">
                    <span
                        className="input-group-text"
                        id={`addon-${source}`}
                    >
                        {label !== undefined ? translate(label) : translate(`resources.${resource}.fields.${source}`)}
                    </span>
                </div>
                <Field
                    name={source}
                    source={source}
                    component={component}
                    aria-describedby={`addon-${source}`}
                    className={classNames('form-control', 'form-control-sm', className)}
                    {...rest}
                >
                    {component === 'select' ? (
                        <>
                            {allowEmpty ? <option /> : ''}
                            {choices.map((choice) => (
                                <option
                                    value={choice.id}
                                    key={choice.id}
                                >
                                    {translate && skipFormat === false ? translate(choice.name) : choice.name}
                                </option>
                            ))}
                        </>
                    ) : null}
                </Field>
            </div>
        );
    }
);

MyCustomInputGroup.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]).isRequired,
    choices: PropTypes.array,
    allowEmpty: PropTypes.bool,
    labelClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    inputClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    groupClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    skipFormat: PropTypes.bool
};
MyCustomInputGroup.defaultProps = {
    component: 'input',
    allowEmpty: true,
    skipFormat: true
};

export const MySelectInput = translate((props) => {
    const {
        isRequired,
        pagination,
        setPagination,
        setSort,
        translateChoice,
        setFilter,
        ...rest
    } = props;
    return (
        <MyCustomInput
            disabled={props['readOnly']}
            {...rest}
            component="select"
        />
    );
});
MySelectInput.propTypes = { choices: PropTypes.array };
