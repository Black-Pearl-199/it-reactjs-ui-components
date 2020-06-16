import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { find, get } from 'lodash';
import moment from 'moment-timezone';
import * as PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';
import { useTranslate } from 'react-admin';

export const FIELD_ARRAY = 'array';
export const FIELD_BOOLEAN = 'boolean';
export const FIELD_DATE = 'date';
export const FIELD_SELECT = 'select';
export const FIELD_TEXT = 'text';
export const ALL_TYPE = [FIELD_BOOLEAN, FIELD_DATE, FIELD_SELECT, FIELD_TEXT, FIELD_ARRAY];

const defaultDateFormat = 'DD-MM-YYYY';

const renderField = ({ type, value, choices, translateChoice, translate, children, ...rest }) => {
    // console.log('render field type', type, 'value', value, typeof value);
    switch (type) {
        case FIELD_BOOLEAN:
            if (choices) {
                const convertVal = choices[value ? 1 : 0];
                return translateChoice ? translate(convertVal) : convertVal;
            }
            return value ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />;
        case FIELD_DATE:
            let date = value;
            // console.log(date);
            if (typeof date === 'string') {
                const { dateFormat = defaultDateFormat } = rest;
                date = moment(date).tz('Asia/Ho_Chi_Minh');
                return date.format(dateFormat);
            }
            return date;
        case FIELD_SELECT:
            const { optionId = 'id', optionValue = 'name' } = rest;
            const valueObj = find(choices, { [optionId]: value }) || {};
            const presentValue = valueObj[optionValue];
            return translateChoice && presentValue ? translate(presentValue) : presentValue;
        case FIELD_ARRAY:
            // console.log(children, value);
            const data = (value && value.reduce((prev, item) => ({ ...prev, [JSON.stringify(item)]: item }), {})) || {};
            const ids = (value && value.map(JSON.stringify)) || [];
            return ids.map((id) => cloneElement(Children.only(children), {
                key: id,
                record: data[id],
                ...rest
            }));
        // return 'array';
        default:
            return value && typeof value !== 'string' ? JSON.stringify(value) : value;
    }
};

const MyField = (props) => {
    const translate = useTranslate();
    const { record, resource, source, groupClasses, labelClasses, fieldClasses, hideLabel, label, skipTranslateLabel, ...rest } = props;
    const translatedLabel = !hideLabel && `${label && !skipTranslateLabel ? translate(label) : translate(`resources.${resource}.fields.${source}`)}: `;
    const labelNotTranslate = label;
    const value = get(record, source);
    const fieldId = `field-${source}`;
    return (
        <div className={classNames('w-100', 'align-items-center', groupClasses)}>
            {!hideLabel ? (
                <label className={labelClasses} htmlFor={fieldId}>
                    {skipTranslateLabel ? labelNotTranslate : translatedLabel}
                </label>
            ) : null}
            <div className={classNames('font-1rem', fieldClasses)} id={fieldId}>
                {renderField({ value, translate, ...rest })}
            </div>
        </div>
    );
};

MyField.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func,
    type: PropTypes.oneOf(ALL_TYPE).isRequired,
    translateChoice: PropTypes.bool,
    groupClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    fieldClasses: PropTypes.string,
    hideLabel: PropTypes.bool,
    label: PropTypes.any,
    choices: PropTypes.array,
    skipTranslateLabel: PropTypes.bool
};

MyField.defaultProps = {
    translateChoice: false,
    hideLabel: false,
    type: FIELD_TEXT,
    skipTranslateLabel: false
};

export default MyField;
