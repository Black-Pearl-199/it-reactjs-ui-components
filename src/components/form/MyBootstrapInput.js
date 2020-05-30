import classNames from 'classnames';
import { vi } from 'date-fns/locale';
import isReact from 'is-react';
import { get, uniqBy } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import DatePicker, { registerLocale } from 'react-datepicker';
import MaskedInput from 'react-maskedinput';
import { useSelector } from 'react-redux';
import { dateShowFormat, dateStoreFormat } from '../../utils';

export const CHECKBOX_EMPTY = '.checkbox-empty';
registerLocale('vi', vi);

const sanitizeRestProps = ({
    submit,
    optionText,
    optionValue,
    label,
    formatDate,
    isRequired,
    setFilter,
    setPagination,
    pagination,
    setSort,
    translateChoice,
    basePath,
    hasList,
    hasCreate,
    hasEdit,
    hasShow,
    loaded,
    selectedIds,
    loading,
    ITCrudGetList,
    invalid,
    pristine,
    handleSubmit,
    submitOnEnter,
    saving,
    handleSubmitWithRedirect,
    convertValue,
    defaultValue,
    ...rest
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

const renderInput = ({ inputId, translatedLabel, composeInputClasses, ...props }) => {
    const {
        component,
        type,
        source,
        hideLabel,
        skipFormat,
        choices,
        allowEmpty,
        submit,
        value,
        labelClasses,
        emptyChoiceLabel,
        translate,
        formatText = translate,
        groupClasses,
        ...rest
    } = props;
    let { defaultValue } = props;
    const sanitizeProps = sanitizeRestProps(rest);
    // console.log(component, sanitizeProps);
    // console.log('input value 1=', inputValue, '-2=', value, '-3=', defaultValue);
    // console.log('received value', value);
    // console.log('rest props', props);
    if (!defaultValue) {
        defaultValue = ((component === 'input' && type !== 'checkbox') || component === 'select') ? '' : undefined;
    }
    let showText = null;
    if (hideLabel === true) showText = translatedLabel;
    else if (emptyChoiceLabel) showText = translate(emptyChoiceLabel);
    let inputValue = value !== undefined ? value : defaultValue;
    const { optionText = 'name', optionValue = 'id' } = props;
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
                        <label className={classNames('form-check-label', labelClasses)} htmlFor={inputId}>
                            {translatedLabel}
                        </label>
                    </div>
                );
            }
            // checkbox group
            if (type === 'checkbox-group') {
                return (
                    <div
                        name={source}
                        id={inputId}
                        value={inputValue}
                        className={classNames('d-flex justify-content-between mx-3', composeInputClasses)}
                        title={translatedLabel}
                        disabled={sanitizeProps.readOnly}
                        placeholder={!hideLabel ? translatedLabel : null}
                    >
                        {allowEmpty && (
                            <div className={groupClasses}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={CHECKBOX_EMPTY}
                                    checked={!inputValue || inputValue.length === 0}
                                    id={`${source}-clear`}
                                    {...sanitizeProps}
                                />
                                <label className="form-check-label mr-2" htmlFor={`${source}-clear`}>
                                    {showText}
                                </label>
                            </div>
                        )}
                        {uniqBy(choices, optionValue).map((choice) => {
                            const choiceValue = choice[optionValue];
                            const inputId = `${source}-${choiceValue}`;
                            return (
                                <div className={groupClasses} key={inputId}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={choiceValue}
                                        checked={inputValue && inputValue.includes(choiceValue)}
                                        id={inputId}
                                        {...sanitizeProps}
                                    />
                                    <label className="form-check-label mr-2" htmlFor={inputId}>
                                        {!skipFormat ? translate(choice[optionText]) : choice[optionText]}
                                    </label>
                                </div>
                            );
                        })}
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
            // const { optionText = 'name', optionValue = 'id' } = props;
            // {hideLabel === true ? `(${translatedLabel})` : (emptyChoiceLabel ? `${translate(emptyChoiceLabel)}` : null)}
            console.log('UIIIIII - MyBootstrapInput select value', inputValue, typeof inputValue);
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
                    {allowEmpty ? <option value="">{showText}</option> : null}
                    {uniqBy(choices, optionValue).map((choice) => {
                        const text = optionText === '.' ? choice : get(choice, optionText);
                        return (
                            <option value={choice[optionValue]} key={`${source}-${choice[optionValue]}`}>
                                {formatText && !skipFormat ? formatText(text) : text}
                            </option>
                        );
                    })}
                </select>
            );
        case 'date':
            inputValue = typeof inputValue === 'string' && inputValue.toLowerCase() === 'invalid date' ? defaultValue : value;
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
    translate: PropTypes.func,
    groupClasses: PropTypes.string
};

// input not null khi sử dụng ReferenceInput
const MyBootstrapInput = (props) => {
    const translate = useTranslate();
    const loading = useSelector((state) => state.admin.loading > 0);
    const {
        label,
        labelClasses,
        inputClasses,
        groupClasses,
        alignCenter,
        formatDate,
        className,
        inputValue,
        onInputChange,
        small,
        readOnly,
        input,
        checkConvert,
        formClassName,
        ...rest
    } = props;
    const { resource, source, component, hideLabel, type } = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);

    const inputId = `input-${source}`;
    // console.log('source', source);
    const composeInputClasses = classNames(
        type !== 'checkbox' && type !== 'checkbox-group' ? ['form-control', small ? 'form-control-sm' : '', 'w-100'] : ''
    );
    // console.log('-----------type', type, source, composeInputClasses);
    // console.log('MyBootstrapInput', input);
    // console.log(props);
    let value = input && input.value ? input.value : inputValue && inputValue[source];
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
                        hour: 0,
                        minute: 0,
                        second: 0,
                        milliseconds: 0
                    });
                } else if (source === 'end_date' || source === 'endDate') {
                    newValue.set({
                        hour: 23,
                        minute: 59,
                        second: 59,
                        milliseconds: 999
                    });
                }
                newValue = newValue.format(formatDate);
            } else newValue = undefined;
        } else if (component === 'input' && type === 'checkbox-group') {
            let checkboxValue = value;
            const { target } = e;
            // newValue = checkboxValue;
            if (target.checked) {
                if (target.value === CHECKBOX_EMPTY) {
                    checkboxValue = undefined;
                } else if (checkboxValue) checkboxValue.push(target.value);
                else checkboxValue = [target.value];
            } else if (!target.checked) {
                if (checkboxValue) {
                    const valueIndex = checkboxValue.indexOf(target.value);
                    if (valueIndex > -1) checkboxValue.splice(valueIndex, 1);
                }
            }
            newValue = checkboxValue;
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
                {isReact.component(component) || isReact.element(component)
                    ? React.cloneElement(component, {
                        onChange,
                        value,
                        resource
                    })
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
                    })}
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
    formatDate: PropTypes.string,
    location: PropTypes.object
};
MyBootstrapInput.defaultProps = {
    component: 'input',
    type: 'text',
    hideLabel: false,
    small: true,
    alignCenter: true,
    formatDate: dateStoreFormat
};

export default MyBootstrapInput;
