import pickBy from 'lodash/pickBy';
import { parse } from 'query-string';
import { createSelector } from 'reselect';
import { inputValidate } from '../configurations/validation';

export const cleanObject = (obj) => {
    const result = { ...obj };
    Object.entries(result).forEach(([key, val]) => {
        if (val && typeof val === 'object') cleanObject(val);
        else if (val == null) delete result[key];
    });
    return result;
};

export const isEmpty = (obj) => obj === undefined || obj === null || Object.keys(obj).length === 0;

/* eslint-disable no-bitwise */
export const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});

export const dateStoreFormat = 'YYYY-MM-DDTHH:mm:ss';
export const dateShowFormat = 'dd-MM-yyyy';

export const getInvalidMessages = (syncErrors, translate) => {
    let result = [];
    Object.values(syncErrors).forEach((value) => {
        if (typeof value === 'string') {
            result.push(translate ? translate(value) : value);
        } else if (typeof value === 'object') {
            result = [...result, ...getInvalidMessages(value, translate)];
        }
    });
    return result;
};

export const hasCustomParams = (params) => (params
    && ((params.filter && Object.keys(params.filter).length > 0)
        || params.order != null
        || params.page !== 1
        || params.perPage != null
        || params.sort != null));

export const notificationName = (recordForm, resource, translate) => `${translate(`resources.${resource}.name`)}`;

/**
 * Inspect an object and check values of all attributes,
 * TODO : need to support full text search and regex search
 * @param {Object} obj - object need to search
 * @param {String} val - string to search
 * @return {Boolean} true if obj contain val in all of values
 */
export const searchValues = (obj, val) => (Object.values(obj).some((value) => {
    const type = typeof value;
    switch (type) {
        case 'function':
        case 'undefined':
            return false;
        case 'object':
            if (!value) return false;
            return searchValues(value, val);
        default:
            return String(value)
                .toLowerCase()
                .indexOf(val.toLowerCase()) > -1;
    }
}));
export const searchInDataTable = (obj, val) => {
    const result = {};
    Object.keys(obj).forEach((key) => {
        const type = typeof obj[key];
        switch (type) {
            case 'function':
            case 'undefined':
                break;
            default:
                if (obj[key] && searchValues(obj[key], val)) result[key] = obj[key];
                break;
        }
    });
    return result;
};

const validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
const getLocationPath = (props) => props.location.pathname;
const getLocationSearch = (props) => props.location.search;
export const selectQuery = createSelector(
    getLocationPath,
    getLocationSearch,
    (path, search) => {
        const query = pickBy(
            parse(search),
            (v, k) => validQueryParams.indexOf(k) !== -1
        );
        if (query.filter && typeof query.filter === 'string') {
            try {
                query.filter = JSON.parse(query.filter);
            } catch (err) {
                delete query.filter;
            }
        }
        return query;
    }
);

export const checkFormValidate = (form, translate, showNotification) => {
    const invalid = {};
    Object.keys(form).forEach((name) => {
        const value = form[name];
        if (
            typeof value === 'string'
            && inputValidate[name] !== undefined
            && inputValidate[name].pattern
        ) {
            if (value && value.length > 0) {
                const { pattern } = inputValidate[name];
                if (!value.match(pattern)) {
                    invalid[name] = `commons.message.invalid.${name}`;
                }
            } else invalid[name] = `commons.message.invalid.${name}`;
        }
    });

    const formValidated = isEmpty(invalid);
    if (!formValidated) {
        const message = Object.values(invalid)
            .map((msg) => translate(msg))
            .join('\n');
        showNotification('commons.message.error', 'warning', {
            messageArgs: { error: message }
        });
    }
    return formValidated;
};
