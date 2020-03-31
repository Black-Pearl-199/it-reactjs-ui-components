import moment from 'moment/moment';
import { fetchUtils } from 'ra-core/esm/index';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY
} from 'react-admin';

import { dateStoreFormat, uuidv4 } from '../../utils';
import { AUTH_TOKEN, checkTokenExpire, refreshToken } from './authProvider';
import jsonServerProvider from './jsonServerProvider';

export const UPDATE_ARRAY = 'UPDATE_ARRAY';
export const CREATE_ARRAY = 'CREATE_ARRAY';

export const USERS = 'user';
export const PERSONS = 'person';
export const ME = 'me';
export const PASSWORDS = 'me/password';
export const AUTH_RESOURCES = [
    PERSONS,
    USERS,
    ME,
    PASSWORDS
];

export const OPERATION_RESOURCES = 'resource';
export const SCOPES = 'scope';
export const CLIENTS = 'client';
export const AUTHORITY = 'authority';
export const AVATARS = 'avatar';
export const ROLES = 'role';

// the resource needs to be registered with the store
export const RESOURCES = [
    ...AUTH_RESOURCES,
    OPERATION_RESOURCES,
    SCOPES,
    CLIENTS,
    AUTHORITY,
    AVATARS,
    ROLES
];

const fetchHttpClient = async (url, options = {}) => {
    const expired = await checkTokenExpire();

    if (expired) {
        console.log('token expired, get new access token');
        try {
            const refreshTokenResult = await refreshToken();
            console.log('refresh token result', refreshTokenResult);
        } catch (e) {
            console.log(e);
        }
    }

    if (!options.headers) {
        options.headers = new Headers({});
    }
    if (!options.headers.has('Content-Type')) {
        options.headers.set('Content-Type', 'application/json');
    } else if (options.headers.get('Content-Type') === 'multipart/form-data') {
        // multipart must add ----------- boundary and content length
        options.headers.delete('Content-Type');
    }
    options.headers.set('Corporate-Id', '001');
    options.headers.set('Request-Id', uuidv4());
    options.headers.set('Request-Time', moment().format(dateStoreFormat));

    options.headers.set('Authorization', localStorage.getItem(AUTH_TOKEN));
    console.log(localStorage.getItem(AUTH_TOKEN));

    console.log('create http client', options.headers.get('Authorization'));

    return fetchUtils.fetchJson(url, options);
};

const dataProviders = [
    {
        dataProvider: jsonServerProvider(
            process.env.REACT_APP_API_URL,
            fetchHttpClient
        ),
        resources: RESOURCES
    }
];

const getDataProvider = (type, resource, params) => {
    const mapping = dataProviders.find((dp) => dp.resources.includes(resource));
    return mapping.dataProvider(type, resource, params);
};

const iTechDataProvider = {
    getList: (resource, params) => getDataProvider(GET_LIST, resource, params),
    getOne: (resource, params) => getDataProvider(GET_ONE, resource, params),
    getMany: (resource, params) => getDataProvider(GET_MANY, resource, params),
    getManyReference: (resource, params) => getDataProvider(GET_MANY_REFERENCE, resource, params),
    create: (resource, params) => getDataProvider(CREATE, resource, params),
    update: (resource, params) => getDataProvider(UPDATE, resource, params),
    updateMany: (resource, params) => getDataProvider(UPDATE_MANY, resource, params),
    delete: (resource, params) => getDataProvider(DELETE, resource, params),
    deleteMany: (resource, params) => getDataProvider(DELETE_MANY, resource, params)
};

export default iTechDataProvider;
