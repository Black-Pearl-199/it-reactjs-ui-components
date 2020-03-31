import {
    CREATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from 'ra-core';

import { stringify } from 'query-string';
import { isEmpty } from 'lodash';
import {
    CREATE_ARRAY,
    UPDATE_ARRAY
} from './iTechDataProvider';
import { MSG_CODE } from '../apiEndpoint';
import { cleanObject } from '../../utils';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GREEN } from '../logging';

export const PREFIX_FILTER = 'prefix';
export const POSTFIX_FILTER = 'postfix';

const convertResourceToEndpoint = (resource) => resource;

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (function (apiUrl, httpClient = fetchUtils.fetchJson) {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        console.log('convert Data Request to HTTP');
        console.log('type', type);
        console.log('resource', resource);
        console.log('params', params);
        let url = '';
        const options = {};
        console.log('Params', params);
        const { pagination = {}, sort = {}, filter } = params;
        const pathResource = convertResourceToEndpoint(resource);
        let prefix;
        let postfix;
        let alter;
        if (filter) {
            alter = filter['alter'];
            prefix = filter[PREFIX_FILTER];
            postfix = filter[POSTFIX_FILTER];
            delete filter['alter'];
            delete filter[PREFIX_FILTER];
            delete filter[POSTFIX_FILTER];
            cleanObject(filter);
        }
        const baseUrl = `${apiUrl}/${prefix ? `${prefix}/` : ''}${alter ||
            pathResource}${postfix ? `/${postfix}` : ''}`;
        cleanObject(sort);
        switch (type) {
            case GET_LIST: {
                /* if (resource === USERS && filter) {
                    console.log('Params filter', filter);
                    const {v} = filter;
                    if (v === true) delete filter['v'];
                } */
                let { perPage = 10 } = pagination;
                const { page = 1 } = pagination;
                if (isNaN(perPage)) perPage = 10;
                const { field = 'id', order = 'ASC' } = sort;
                const paginationInfo = {
                    offset: `${(page - 1) * perPage}`,
                    limit: `${perPage}`,
                    orderAsc: `${order === 'ASC'}`,
                    orderBy: `${field}`
                };
                console.log('Filter', filter);
                if (!isEmpty(filter)) {
                    options.method = 'POST';
                    options.body = JSON.stringify({ ...filter });
                    url = `${apiUrl}/${
                        prefix ? `${prefix}/` : ''
                    }search/${pathResource}?${stringify(paginationInfo)}`;
                } else {
                    url = `${baseUrl}?${stringify(paginationInfo)}`;
                    options.method = 'GET';
                }
                break;
            }
            case GET_MANY: {
                const query = params.ids
                    .map((aid) => (aid && Object.prototype.hasOwnProperty.call(aid, 'id')
                        ? aid.id
                        : aid))
                    .join(',');
                url = `${baseUrl}?ids=${query}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = pagination;
                const { field, order } = sort;
                const query = {
                    ...fetchUtils.flattenObject(filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage
                };
                // url = apiUrl + "/" + resource + "?" + stringify(query);
                // console.log('bbbbb',query);
                url = `${baseUrl}?ids=${query.id.map((obj) => obj.id)}`;
                break;
            }
            case GET_ONE:
                url = `${baseUrl}/${params.id}`;
                break;
            case UPDATE:
                url = `${baseUrl}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${baseUrl}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${baseUrl}/${params.id}`;
                options.method = 'DELETE';
                options.body = JSON.stringify(
                    params.reason ? params.reason : 'user delete'
                );
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        console.log('Requesting url ', url, ' with options ', options);
        return { url, options };
    };
    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} requestParams The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, requestParams) => {
        // const headers = response.headers;
        console.groupCollapsed(
            `%cFETCH RESPONSE %c${type} ${resource}`,
            COLOR_GREEN,
            COLOR_BLACK
        );
        const json = response.json;
        console.log(json);
        console.groupEnd();
        const { header, body } = json;
        const { responseCode } = header;
        const { numOfRecords } = header;
        console.log(resource, responseCode, type);
        if (responseCode === MSG_CODE.INTERNAL_SERVER_ERROR) {
            throw new Error('Failed to fetch');
        } else if (responseCode === MSG_CODE.FORBIDDEN) {
            throw new Error('commons.error.forbidden');
        }
        console.groupEnd();
        switch (type) {
            case GET_LIST:
            case GET_MANY:
            case GET_MANY_REFERENCE:
                if (responseCode === MSG_CODE.FOUND) {
                    if (!numOfRecords) {
                        throw new Error(
                            'The numOfRecords header is missing in the response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                        );
                    }
                    return {
                        data: body, // .map(item => ({...item, tmp: item})),
                        total: numOfRecords
                    };
                }
                if (responseCode === MSG_CODE.BAD_REQUEST) {
                    throw new Error('commons.message.badRequest');
                } else if (
                    responseCode !== MSG_CODE.NOT_FOUND &&
                    responseCode > MSG_CODE.BAD_REQUEST
                ) {
                    throw new Error(
                        header.message ? header.message : responseCode
                    );
                } else {
                    return {
                        data: [], // .map(item => ({...item, tmp: item})),
                        total: 0
                    };
                }
            case DELETE:
                if (responseCode === MSG_CODE.UPDATED) {
                    return { data: { id: requestParams.id } };
                }
                if (responseCode < MSG_CODE.BAD_REQUEST) {
                    // success
                    return { data: body };
                }
                return { data: header };

            case UPDATE:
                if (responseCode === MSG_CODE.UPDATED) {
                    if (!body.id) {
                        return {
                            data: {
                                ...requestParams.data,
                                id: requestParams.id
                            }
                        };
                    }
                    return { data: body };
                }
                if (responseCode === MSG_CODE.PARAMETER_REQUIRED) {
                    throw new Error('commons.message.parameterRequired');
                } else if (responseCode === MSG_CODE.BAD_REQUEST) {
                    throw new Error('commons.message.badRequest');
                }
                throw new Error(header.message);
            case CREATE:
                if (responseCode === MSG_CODE.CREATED) {
                    return { data: body };
                }
                if (responseCode === MSG_CODE.DUPLICATED) {
                    console.log('duplicate id ');
                    throw new Error(
                        header.message
                            ? header.message
                            : 'commons.message.duplicate'
                    );
                } else if (responseCode === MSG_CODE.PARAMETER_REQUIRED) {
                    throw new Error('commons.message.parameterRequired');
                } else if (responseCode === MSG_CODE.BAD_REQUEST) {
                    throw new Error('commons.message.badRequest');
                }
                break;
            case GET_ONE:
                if (body) {
                    return {
                        data: body
                    };
                }
                return body;
            default:
                return body;
        }
        return null;
    };
    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        console.groupCollapsed(
            `%cFETCH REQUEST  %c${type} ${resource}`,
            COLOR_BLUE,
            COLOR_BLACK
        );
        // console.log("Linh....................", type, resource, params)
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map((id) => {
                    console.groupEnd();
                    return httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data)
                    });
                })
            ).then((responses) => {
                console.groupEnd();
                return {
                    data: responses.map((response) => response.json)
                };
            });
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            if (params.ids.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            }
            console.log('delete many', params);
            return Promise.all(
                params.ids.map((id) => {
                    console.log(DELETE_MANY, `${apiUrl}/${resource}/${id}`);
                    console.groupEnd();
                    return httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(
                            params.reason ? params.reason : 'user delete'
                        )
                    });
                })
            ).then((responses) => {
                console.log(DELETE_MANY, responses);
                console.groupEnd();
                return {
                    data: responses.map((response) => response.json)
                };
            });
        }

        // new by TungLT
        if (type === UPDATE_ARRAY) {
            if (params.data.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            }
            return Promise.all(
                params.data.map((obj) => {
                    console.log(UPDATE_ARRAY, `${apiUrl}/${resource}`, obj);
                    console.groupEnd();
                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'PUT',
                        body: JSON.stringify(obj)
                    });
                })
            ).then((responses) => {
                console.log(UPDATE_ARRAY, responses);
                console.groupEnd();
                return {
                    data: responses.map((response) => response.json)
                };
            });
        }

        if (type === CREATE_ARRAY) {
            if (params.data.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            }
            console.groupEnd();
            return Promise.all(
                params.data.map((obj) => {
                    console.log(CREATE_ARRAY, `${apiUrl}/${resource}`, obj);
                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify(obj)
                    });
                })
            ).then((responses) => {
                console.log(CREATE_ARRAY, responses);
                console.groupEnd();
                return {
                    data: responses.map((response) => response.json)
                };
            });
        }

        const request = convertDataRequestToHTTP(type, resource, params);
        console.groupEnd();
        const { url, options } = request;
        return httpClient(url, options).then((response) => convertHTTPResponse(response, type, resource, params));
    };
});
