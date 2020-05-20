import classNames from 'classnames';
import { vi } from 'date-fns/locale';
import isReact from 'is-react';
import { get } from 'lodash';
import uniqBy from 'lodash/uniqBy';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import MaskedInput from 'react-maskedinput';
import { useSelector } from 'react-redux';
import { dateShowFormat, dateStoreFormat } from '../../utils';

registerLocale('vi', vi);

const sanitizeRestProps = ({
    submit, optionText, optionValue, label, formatDate, isRequired, setFilter, setPagination, pagination, setSort, translateChoice, basePath, hasList, hasCreate, hasEdit, hasShow, loaded, selectedIds, loading, ITCrudGetList, invalid, pristine, handleSubmit, submitOnEnter, saving, handleSubmitWithRedirect, convertValue, ...rest
}) => rest;

function onChangeRaw(e) {
    // console.log(this);
    const rawVal = e.target.value;
    // console.log('new raw', rawVal);
    try {
        const date = moment(rawVal, 'DD-MM-YYYY', true);
        if (date.isValid()) {
            // console.log('user input date', date.toDate());
            this.setSelected(date.toDate(), e, true);
        } else {
            this.setSelected(null, e, true);
        }
    } catch (e) {
        // console.error(e);
    }
}

const textareaStyle = { resize: 'none' };

const renderInput = ({
    inputId, translatedLabel, composeInputClasses, ...props
}) => {
    const {
        component, type, source, hideLabel, skipFormat, choices, allowEmpty, submit, value, labelClasses, emptyChoiceLabel, translate, formatText = translate, ...rest
    } = props;
    let { defaultValue } = props;
    const sanitizeProps = sanitizeRestProps(rest);
    // console.log(component, sanitizeProps);
    // console.log('input value 1=', inputValue, '-2=', value, '-3=', defaultValue);
    // console.log('received value', value);
    // console.log('rest props', props);
    if (!defaultValue) {
        defaultValue = (component === 'input' && type !== 'checkbox') ? '' : undefined;
    }
    let inputValue = value !== undefined ? value : defaultValue;
    switch (component) {
        case 'input':
            if (type === 'checkbox') {
                // console.log('check inputValue', inputValue);
                return (
                    <div className="form-check">
                        <input
                            name={source}
                            type="checkbox"
                            title={translatedLabel}
                            checked={!!inputValue}
                            id={inputId}
                            className={classNames('form-check-input', composeInputClasses)}
                            {...sanitizeProps}
                        />
                        <label
                            className={classNames('form-check-label', labelClasses)}
                            htmlFor={inputId}
                        >
                            {translatedLabel}
                        </label>
                    </div>
                );
            }
            return (
                <input
                    name={source}
                    type={type}
                    id={inputId}
                    className={composeInputClasses}
                    title={translatedLabel}
                    {...sanitizeProps}
                    value={inputValue}
                    placeholder={hideLabel === true ? translatedLabel : null}
                />
            );
        case 'textarea':
            return (
                <textarea
                    name={source}
                    id={inputId}
                    style={textareaStyle}
                    className={composeInputClasses}
                    title={translatedLabel}
                    {...sanitizeProps}
                    value={inputValue}
                    placeholder={hideLabel === true ? translatedLabel : null}
                />
            );
        case 'select':
            // remove duplicate choices
            const { optionText = 'name', optionValue = 'id' } = props;
            // {hideLabel === true ? `(${translatedLabel})` : (emptyChoiceLabel ? `${translate(emptyChoiceLabel)}` : null)}
            let showText = null;
            if (hideLabel === true) showText = translatedLabel;
            else if (emptyChoiceLabel) showText = translate(emptyChoiceLabel);
            return (
                <select
                    name={source}
                    id={inputId}
                    value={inputValue}
                    className={composeInputClasses}
                    title={translatedLabel}
                    {...sanitizeProps}
                    disabled={sanitizeProps.readOnly}
                    placeholder={!hideLabel ? translatedLabel : null}
                >
                    {allowEmpty ? (
                        <option
                            value=""
                        >
                            {showText}
                        </option>
                    ) : null}
                    {uniqBy(choices, optionValue)
                        .map((choice, index) => {
                            const text = optionText === '.' ? choice : get(choice, optionText);
                            return (
                                <option
                                    value={choice[optionValue]}
                                    key={index}
                                >
                                    {formatText && !skipFormat ? formatText(text) : text}
                                </option>
                            );
                        })}
                </select>
            );
        case 'date':
            inputValue = (typeof inputValue === 'string' && inputValue.toLowerCase() === 'invalid date') ? defaultValue : value;
            // console.log('date input value', inputValue, typeof inputValue);
            return (
                <DatePicker
                    name={source}
                    strictParsing
                    selected={inputValue ? moment(inputValue, dateStoreFormat).toDate() : defaultValue}
                    dateFormat={dateShowFormat}
                    showYearDropdown
                    {...sanitizeProps}
                    className={composeInputClasses}
                    onChangeRaw={onChangeRaw}
                    autoComplete="off"
                    customInput={<MaskedInput mask="11-11-1111" autoComplete="off" />}
                    placeholderText={hideLabel === true ? translatedLabel : null}
                />
            );
        default:
            return null;
    }
};

renderInput.propTypes = {
    inputId: PropTypes.any,
    translatedLabel: PropTypes.string,
    composeInputClasses: PropTypes.any,
    component: PropTypes.string,
    type: PropTypes.string,
    source: PropTypes.string,
    hideLabel: PropTypes.bool,
    skipFormat: PropTypes.bool,
    choices: PropTypes.object,
    allowEmpty: PropTypes.bool,
    submit: PropTypes.func,
    value: PropTypes.any,
    labelClasses: PropTypes.string,
    emptyChoiceLabel: PropTypes.string,
    formatText: PropTypes.function,
    defaultValue: PropTypes.any,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    translate: PropTypes.func
};

// input not null khi sử dụng ReferenceInput
const MyBootstrapInput = (props) => {
    const translate = useTranslate();
    const loading = useSelector((state) => state.admin.loading > 0);
    const {
        label, labelClasses, inputClasses, groupClasses, alignCenter, formatDate, className, inputValue, onInputChange, small, readOnly, input, checkConvert, formClassName, ...rest
    } = props;
    const {
        resource, source, component, hideLabel, type
    } = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);

    const inputId = `input-${source}`;
    const composeInputClasses = classNames(type !== 'checkbox' ? ['form-control', small ? 'form-control-sm' : '', 'w-100'] : '');
    // console.log('-----------type', type, source, composeInputClasses);
    // console.log('MyBootstrapInput', input);
    // console.log(props);
    let value = input && input.value ? input.value : (inputValue && inputValue[source]);
    if (component === 'input' && type === 'checkbox' && checkConvert) {
        value = value === checkConvert.true;
    }
    // console.log('render input', source, value);
    const onChange = (e) => {
        let newValue;
        if (component === 'date') {
            if (e) {
                newValue = moment(e);
                if (source === 'start_date' || source === 'startDate') {
                    newValue.set({
                        hour: 0, minute: 0, second: 0, milliseconds: 0
                    });
                } else if (source === 'end_date' || source === 'endDate') {
                    newValue.set({
                        hour: 23, minute: 59, second: 59, milliseconds: 999
                    });
                }
                newValue = newValue.format(formatDate);
            } else newValue = undefined;
        } else {
            const { target } = e;
            if (target.type !== 'checkbox') newValue = target.value;
            else newValue = checkConvert ? checkConvert[target.checked] : target.checked;
            // newValue = target.type === 'checkbox' ? (checkConvert ? checkConvert[target.checked] : target.checked) : target.value;
        }
        if (input && input.onChange) {
            input.onChange(newValue, component, type);
        }
        if (onInputChange) {
            onInputChange({ [source]: newValue }, component, type);
        }
    };

    return (
        <div className={classNames(groupClasses, alignCenter ? 'align-items-center' : null)}>
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses)} htmlFor={inputId}>
                    {translatedLabel}
                </label>
            ) : null}
            <div className={inputClasses}>
                {
                    (isReact.component(component) || isReact.element(component)) ? (React.cloneElement(component, {
                        onChange, value, resource
                    }))
                        : renderInput({
                            ...rest,
                            labelClasses,
                            translate,
                            inputId,
                            composeInputClasses,
                            translatedLabel,
                            onChange,
                            value,
                            readOnly: loading || readOnly,
                            disabled: loading || readOnly
                        })
                }
            </div>
        </div>
    );
};
MyBootstrapInput.propTypes = {
    label: PropTypes.string,
    allowEmpty: PropTypes.any,
    alwaysOn: PropTypes.any,
    component: PropTypes.any,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    skipFormat: PropTypes.bool,
    choices: PropTypes.arrayOf(PropTypes.object),
    onInputChange: PropTypes.func,
    inputValue: PropTypes.object,
    groupClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    defaultValue: PropTypes.any,
    small: PropTypes.bool,
    readOnly: PropTypes.bool,
    alignCenter: PropTypes.bool,
    emptyChoiceLabel: PropTypes.string,
    formatText: PropTypes.func,
    checkConvert: PropTypes.shape({ true: PropTypes.any, false: PropTypes.any }),
    convertValue: PropTypes.func,
    input: PropTypes.any,
    formClassName: PropTypes.string,
    formatDate: PropTypes.string
};
MyBootstrapInput.defaultProps = {
    component: 'input',
    type: 'text',
    skipFormat: true,
    hideLabel: false,
    small: true,
    alignCenter: true,
    formatDate: dateStoreFormat
};

export default MyBootstrapInput;
