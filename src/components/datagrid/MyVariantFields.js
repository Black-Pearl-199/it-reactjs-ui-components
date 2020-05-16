import { get, memoize } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import React from 'react';

import MyField, { ALL_TYPE, FIELD_ARRAY, FIELD_BOOLEAN, FIELD_DATE, FIELD_SELECT } from './MyField';

export const MyArrayField = (props) => <MyField {...props} />;

MyArrayField.propTypes = {
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
    choices: PropTypes.array
};

MyArrayField.defaultProps = {
    type: FIELD_ARRAY
};

export const MyBooleanField = (props) => <MyField {...props} />;

MyBooleanField.propTypes = {
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
    choices: PropTypes.array
};

MyBooleanField.defaultProps = {
    type: FIELD_BOOLEAN
};

export const MyDateField = (props) => <MyField {...props} />;

MyDateField.propTypes = {
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
    dateFormat: PropTypes.string
};

MyDateField.defaultProps = {
    type: FIELD_DATE
};


export const MySelectField = (props) => <MyField {...props} />;
MySelectField.propTypes = {
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
    choices: PropTypes.array
};

MySelectField.defaultProps = {
    type: FIELD_SELECT
};


const getAge = memoize((value) => {
    const birthDate = moment(value);
    return birthDate.isValid() ? moment().diff(birthDate, 'years') : '';
});

export const AgeField = (props) => {
    const { record = {}, source } = props;
    const value = source ? get(record, source) : record;

    return getAge(value);
};

AgeField.propTypes = {
    record: PropTypes.object,
    source: PropTypes.string
};
