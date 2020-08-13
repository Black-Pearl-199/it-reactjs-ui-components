import classNames from 'classnames';
import { vi } from 'date-fns/locale';
import isReact from 'is-react';
import { find, get, uniqBy } from 'lodash';
import moment from 'moment';
import { any, arrayOf, bool, func, object, shape, string } from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { useTranslate } from 'react-admin';
import DatePicker, { registerLocale } from 'react-datepicker';
import MaskedInput from 'react-maskedinput';
import { useSelector } from 'react-redux';

import { getLoading } from '../../configurations/selectors';
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
    location,
    resource,
    required,
    fullFill,
    validate,
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

const Input = ({ inputId, translatedLabel, composeInputClasses, ...props }) => {
    const dateRef = useRef();
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
        optionClasses,
        calendarClasses,
        openCalendar,
        onTriggerSubmit,
        fullFill,
        ...rest
    } = props;
    let { defaultValue } = props;
    const sanitizeProps = sanitizeRestProps(rest);

    useEffect(() => {
        if (openCalendar) {
            if (dateRef && dateRef.current) {
                dateRef.current.setFocus();
            }
        }
    }, [openCalendar]);
    // console.log(component, sanitizeProps);
    // console.log('input value 1=', inputValue, '-2=', value, '-3=', defaultValue);
    // console.log('received value', value);
    // console.log('rest props', props);
    if (!defaultValue) {
        defaultValue = (component === 'input' && type !== 'checkbox') || component === 'select' ? '' : undefined;
    }
    let showText = null;
    if (hideLabel === true) showText = translatedLabel;
    else if (emptyChoiceLabel) showText = translate(emptyChoiceLabel);
    let inputValue = value !== undefined ? value : defaultValue;
    const { optionText = 'name', optionValue = 'id' } = props;
    switch (component) {
        case 'input':
            if (type === 'checkbox') {
                console.log('check inputValue', inputValue);
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
                if (!choices) return '';
                const emptyChecked = fullFill ? (inputValue && inputValue.length === choices.length) : (!inputValue || inputValue.length === 0);
                return (
                    <div
                        name={source}
                        id={inputId}
                        value={inputValue}
                        className={classNames('col-12 form-inline px-0', optionClasses.group)}
                        title={translatedLabel}
                        disabled={sanitizeProps.readOnly}
                        placeholder={!hideLabel ? translatedLabel : null}
                    >
                        {allowEmpty && (
                            <div className={optionClasses.item}>
                                <input
                                    className="form-check-input mt-1"
                                    type="checkbox"
                                    value={CHECKBOX_EMPTY}
                                    checked={emptyChecked}
                                    {...sanitizeProps}
                                    id={`${source}-clear`}
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
                                <div className={optionClasses.item} key={inputId}>
                                    <input
                                        className="form-check-input mt-1"
                                        type="checkbox"
                                        value={choiceValue}
                                        checked={inputValue && inputValue.indexOf(choiceValue) > -1}
                                        {...sanitizeProps}
                                        id={inputId}
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
            if (type === 'radio-group') {
                return (
                    <div
                        name={source}
                        id={inputId}
                        value={inputValue}
                        className={optionClasses.group}
                        title={translatedLabel}
                        disabled={sanitizeProps.readOnly}
                        placeholder={!hideLabel ? translatedLabel : null}
                    >
                        {uniqBy(choices, optionValue).map((choice) => {
                            const choiceValue = choice[optionValue];
                            const inputId = `${source}-${choiceValue}`;
                            return (
                                <div className={optionClasses.item} key={inputId}>
                                    <input
                                        className={classNames('form-check-input mt-1', optionClasses.input)}
                                        type="radio"
                                        value={choiceValue}
                                        checked={inputValue === choiceValue}
                                        name={source}
                                        {...sanitizeProps}
                                        id={inputId}
                                    />
                                    <label className={classNames('form-check-label mr-2', optionClasses.label)} htmlFor={inputId}>
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
            // console.log('UIIIIII - MyBootstrapInput select value', inputValue, typeof inputValue);
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
                    ref={dateRef}
                    strictParsing
                    selected={inputValue ? moment(inputValue, dateStoreFormat).toDate() : defaultValue}
                    dateFormat={dateShowFormat}
                    showYearDropdown
                    {...sanitizeProps}
                    className={composeInputClasses}
                    calendarClassName={calendarClasses}
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

Input.propTypes = {
    inputId: any,
    translatedLabel: string,
    openCalendar: bool,
    composeInputClasses: any,
    calendarClasses: string,
    component: string,
    type: string,
    source: string,
    hideLabel: bool,
    skipFormat: bool,
    choices: arrayOf(object),
    allowEmpty: bool,
    submit: func,
    value: any,
    labelClasses: string,
    emptyChoiceLabel: string,
    formatText: func,
    defaultValue: any,
    optionText: string,
    optionValue: string,
    translate: func,
    onTriggerSubmit: func,
    optionClasses: shape({ group: string, item: string, input: string, label: string }),
    fullFill: bool
};

const extendInputType = ['checkbox', 'checkbox-group', 'radio-group'];
const haveBootstrapCss = (type) => extendInputType.indexOf(type) === -1;

// input not null khi sử dụng ReferenceInput
const MyBootstrapInput = (props) => {
    const translate = useTranslate();
    const loading = useSelector(getLoading);
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
        required,
        handleChoiceOption,
        children,
        ...rest
    } = props;
    const { resource, source, component, hideLabel, type, fullFill, choices } = rest;
    const translatedLabel = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);

    const inputId = `input-${source}`;
    // console.log('source', source);
    const composeInputClasses = classNames(
        haveBootstrapCss(type) ? ['form-control', small ? 'form-control-sm' : '', 'w-100'] : ''
    );
    // console.log('-----------type', type, source, composeInputClasses);
    // console.log('MyBootstrapInput', input);
    // console.log('Render Input', props);
    const valueFromInput = input && (input.value || input.checked);
    let value = valueFromInput || (inputValue && inputValue[source]);
    if (component === 'input' && type === 'checkbox' && checkConvert) {
        value = value === checkConvert.true;
    }
    // console.log('render input', source, value);
    const onChange = (e) => {
        let newValue;
        const key = rest.optionValue || 'id';
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
            if (target.checked) {
                if (target.value === CHECKBOX_EMPTY) {
                    if (fullFill) {
                        checkboxValue = choices.map((choice) => get(choice, key));
                    } else checkboxValue = undefined;
                } else if (!checkboxValue) checkboxValue = [target.value];
                else if (checkboxValue.indexOf(target.value) === -1) {
                    checkboxValue.push(target.value);
                }
            } else {
                if (target.value === CHECKBOX_EMPTY && fullFill) {
                    checkboxValue = undefined;
                }
                if (checkboxValue) {
                    const valueIndex = checkboxValue.indexOf(target.value);
                    if (valueIndex > -1) checkboxValue.splice(valueIndex, 1);
                    if (checkboxValue.length === 0) checkboxValue = undefined;
                }
            }
            newValue = checkboxValue && [...checkboxValue];
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
        if (handleChoiceOption && Array.isArray(rest.choices)) {
            // TODO: lỗi nếu handle choice nhưng cho array input vì ko find được
            let choice = find(rest.choices, { [key]: newValue });
            const parsedValue = parseInt(newValue, 10);
            if (!choice && !isNaN(parsedValue)) choice = find(rest.choices, { [key]: parsedValue });
            handleChoiceOption(choice);
        }
    };

    const inputProps = {
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
    };

    return (
        <div className={classNames(groupClasses, alignCenter ? 'align-items-center' : null)}>
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)} htmlFor={inputId}>
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
                    : <Input {...inputProps} />}
                {children}
            </div>
        </div>
    );
};
MyBootstrapInput.propTypes = {
    label: string,
    openCalendar: bool,
    allowEmpty: any,
    alwaysOn: any,
    component: any,
    type: string,
    hideLabel: bool,
    skipFormat: bool,
    choices: arrayOf(object),
    onInputChange: func,
    inputValue: object,
    groupClasses: string,
    optionClasses: shape({ group: string, item: string, input: string, label: string }),
    inputClasses: string,
    labelClasses: string,
    calendarClasses: string,
    defaultValue: any,
    small: bool,
    readOnly: bool,
    alignCenter: bool,
    emptyChoiceLabel: string,
    formatText: func,
    checkConvert: shape({ true: any, false: any }),
    convertValue: func,
    input: any,
    formClassName: string,
    formatDate: string,
    required: bool,
    fullFill: bool,
    handleChoiceOption: func,
    onTriggerSubmit: func
};
MyBootstrapInput.defaultProps = {
    component: 'input',
    type: 'text',
    hideLabel: false,
    small: true,
    alignCenter: true,
    formatDate: dateStoreFormat,
    optionClasses: {},
    fullFill: false
};

export default MyBootstrapInput;
