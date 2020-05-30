import {
    CREATE,
    CRUD_DELETE,
    CRUD_GET_LIST,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from 'react-admin';

export const IT_CRUD_GET_LIST = 'IT/CRUD_GET_LIST';
export const IT_CRUD_GET_LIST_LOADING = 'IT/CRUD_GET_LIST_LOADING';
export const IT_CRUD_GET_LIST_FAILURE = 'IT/CRUD_GET_LIST_FAILURE';
export const IT_CRUD_GET_LIST_SUCCESS = 'IT/CRUD_GET_LIST_SUCCESS';
export const ITCrudGetList = function (params) {
    const { resource, pagination, sort, filter } = params;
    return {
        type: CRUD_GET_LIST,
        payload: { pagination, sort, filter },
        meta: {
            resource,
            fetch: GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_GET_ALL = 'IT/CRUD_GET_ALL';
export const IT_CRUD_GET_ALL_LOADING = 'IT/CRUD_GET_ALL_LOADING';
export const IT_CRUD_GET_ALL_FAILURE = 'IT/CRUD_GET_ALL_FAILURE';
export const IT_CRUD_GET_ALL_SUCCESS = 'IT/CRUD_GET_ALL_SUCCESS';
export const ITCrudGetAll = function ({ ...params }) {
    const { resource, sort, filter, maxResults, callback } = params;
    // console.log('ITCrud get all', params)
    return {
        type: IT_CRUD_GET_ALL,
        payload: { sort, filter, pagination: { page: 1, perPage: maxResults } },
        meta: {
            resource,
            fetch: GET_LIST,
            onSuccess: { callback },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_GET_ONE = 'IT/CRUD_GET_ONE';
export const IT_CRUD_GET_ONE_LOADING = 'IT/CRUD_GET_ONE_LOADING';
export const IT_CRUD_GET_ONE_FAILURE = 'IT/CRUD_GET_ONE_FAILURE';
export const IT_CRUD_GET_ONE_SUCCESS = 'IT/CRUD_GET_ONE_SUCCESS';
export const ITCrudGetOne = function ({ ...params }) {
    const { resource, id, basePath, refresh = true, filter } = params;
    return {
        type: IT_CRUD_GET_ONE,
        payload: { id, filter },
        meta: {
            resource,
            fetch: GET_ONE,
            basePath,
            onFailure: {
                notification: {
                    body: 'ra.notification.item_doesnt_exist',
                    level: 'warning'
                },
                redirectTo: 'list',
                refresh
            }
        }
    };
};
export const IT_CRUD_CREATE = 'IT/CRUD_CREATE';
export const IT_CRUD_CREATE_LOADING = 'IT/CRUD_CREATE_LOADING';
export const IT_CRUD_CREATE_FAILURE = 'IT/CRUD_CREATE_FAILURE';
export const IT_CRUD_CREATE_SUCCESS = 'IT/CRUD_CREATE_SUCCESS';
export const ITCrudCreate = function (params) {
    const { resource, data, basePath, redirectTo = 'edit', resourceName, callback, filter, meta } = params;
    // const id = data.id;
    return {
        type: IT_CRUD_CREATE,
        payload: { data, filter },
        meta: {
            resource,
            fetch: CREATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.created',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    }
                },
                redirectTo,
                basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: { ...data }
                }
            },
            ...meta
        }
    };
};
export const IT_CRUD_UPDATE = 'IT/CRUD_UPDATE';
export const IT_CRUD_UPDATE_LOADING = 'IT/CRUD_UPDATE_LOADING';
export const IT_CRUD_UPDATE_FAILURE = 'IT/CRUD_UPDATE_FAILURE';
export const IT_CRUD_UPDATE_SUCCESS = 'IT/CRUD_UPDATE_SUCCESS';
export const IT_CRUD_UPDATE_OPTIMISTIC = 'IT/CRUD_UPDATE_OPTIMISTIC';
export const ITCrudUpdate = function (params) {
    const { resource, id, data, previousData, basePath, redirectTo = 'show', resourceName, callback, filter, meta } = params;
    return {
        type: IT_CRUD_UPDATE,
        payload: {
            id,
            data,
            previousData,
            filter
        },
        meta: {
            resource,
            fetch: UPDATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    }
                },
                redirectTo,
                basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: { ...data }
                }
            },
            ...meta
        }
    };
};
export const IT_CRUD_UPDATE_MANY = 'IT/CRUD_UPDATE_MANY';
export const IT_CRUD_UPDATE_MANY_LOADING = 'IT/CRUD_UPDATE_MANY_LOADING';
export const IT_CRUD_UPDATE_MANY_FAILURE = 'IT/CRUD_UPDATE_MANY_FAILURE';
export const IT_CRUD_UPDATE_MANY_SUCCESS = 'IT/CRUD_UPDATE_MANY_SUCCESS';
export const IT_CRUD_UPDATE_MANY_OPTIMISTIC = 'IT/CRUD_UPDATE_MANY_OPTIMISTIC';
export const ITCrudUpdateMany = function (params) {
    const { resource, ids, data, basePath, refresh = true, resourceName, filter } = params;
    return {
        type: IT_CRUD_UPDATE_MANY,
        payload: { ids, data, filter },
        meta: {
            resource,
            fetch: UPDATE_MANY,
            cancelPrevious: false,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length,
                        resource_name: resourceName
                    }
                },
                basePath,
                refresh,
                unselectAll: true
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_DELETE = 'IT/CRUD_DELETE';
export const IT_CRUD_DELETE_LOADING = 'IT/CRUD_DELETE_LOADING';
export const IT_CRUD_DELETE_FAILURE = 'IT/CRUD_DELETE_FAILURE';
export const IT_CRUD_DELETE_SUCCESS = 'IT/CRUD_DELETE_SUCCESS';
export const IT_CRUD_DELETE_OPTIMISTIC = 'IT/CRUD_DELETE_OPTIMISTIC';
export const ITCrudDelete = function ({ ...params }) {
    const { resource, id, previousData, basePath, redirectTo = 'list', resourceName, reason, callback, filter, purge, optimistic = false } = params;
    return {
        type: CRUD_DELETE,
        payload: {
            id,
            previousData,
            reason,
            filter,
            purge
        },
        meta: {
            resource,
            fetch: DELETE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    }
                },
                redirectTo,
                basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: {
                        ...previousData,
                        resource_name: resourceName
                    }
                }
            },
            optimistic
        }
    };
};
export const IT_CRUD_DELETE_MANY = 'IT/CRUD_DELETE_MANY';
export const IT_CRUD_DELETE_MANY_LOADING = 'IT/CRUD_DELETE_MANY_LOADING';
export const IT_CRUD_DELETE_MANY_FAILURE = 'IT/CRUD_DELETE_MANY_FAILURE';
export const IT_CRUD_DELETE_MANY_SUCCESS = 'IT/CRUD_DELETE_MANY_SUCCESS';
export const IT_CRUD_DELETE_MANY_OPTIMISTIC = 'IT/CRUD_DELETE_MANY_OPTIMISTIC';
export const ITCrudDeleteMany = function ({ ...params }) {
    const { resource, ids, basePath, resourceName, refresh = true, filter } = params;
    return {
        type: IT_CRUD_DELETE_MANY,
        payload: { ids, filter },
        meta: {
            resource,
            fetch: DELETE_MANY,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length,
                        resource_name: resourceName
                    }
                },
                basePath,
                refresh,
                unselectAll: true
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_GET_MANY = 'IT/CRUD_GET_MANY';
export const IT_CRUD_GET_MANY_LOADING = 'IT/CRUD_GET_MANY_LOADING';
export const IT_CRUD_GET_MANY_FAILURE = 'IT/CRUD_GET_MANY_FAILURE';
export const IT_CRUD_GET_MANY_SUCCESS = 'IT/CRUD_GET_MANY_SUCCESS';
// Reference related actions
export const ITCrudGetMany = function (resource, ids) {
    return {
        type: IT_CRUD_GET_MANY,
        payload: { ids },
        meta: {
            resource,
            fetch: GET_MANY,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_GET_MATCHING = 'IT/CRUD_GET_MATCHING';
export const IT_CRUD_GET_MATCHING_LOADING = 'IT/CRUD_GET_MATCHING_LOADING';
export const IT_CRUD_GET_MATCHING_FAILURE = 'IT/CRUD_GET_MATCHING_FAILURE';
export const IT_CRUD_GET_MATCHING_SUCCESS = 'IT/CRUD_GET_MATCHING_SUCCESS';
export const ITCrudGetMatching = function ({ ...params }) {
    const { reference, relatedTo, pagination, sort, filter } = params;
    return {
        type: IT_CRUD_GET_MATCHING,
        payload: { pagination, sort, filter },
        meta: {
            resource: reference,
            relatedTo,
            fetch: GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
export const IT_CRUD_GET_MANY_REFERENCE = 'IT/CRUD_GET_MANY_REFERENCE';
export const IT_CRUD_GET_MANY_REFERENCE_LOADING = 'IT/CRUD_GET_MANY_REFERENCE_LOADING';
export const IT_CRUD_GET_MANY_REFERENCE_FAILURE = 'IT/CRUD_GET_MANY_REFERENCE_FAILURE';
export const IT_CRUD_GET_MANY_REFERENCE_SUCCESS = 'IT/CRUD_GET_MANY_REFERENCE_SUCCESS';
export const ITCrudGetManyReference = function ({ ...params }) {
    const { reference, target, id, relatedTo, pagination, sort, filter, source } = params;
    return {
        type: IT_CRUD_GET_MANY_REFERENCE,
        payload: {
            target,
            id,
            pagination,
            sort,
            filter,
            source
        },
        meta: {
            resource: reference,
            relatedTo,
            fetch: GET_MANY_REFERENCE,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                }
            }
        }
    };
};
