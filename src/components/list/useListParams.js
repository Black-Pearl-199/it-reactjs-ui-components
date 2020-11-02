import { debounce as lodashDebounce, set } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { queryReducer, removeEmpty, removeKey } from 'react-admin';

// eslint-disable-next-line import/no-extraneous-dependencies
import { SORT_ASC, SET_SORT, SET_PAGE, SET_PER_PAGE, SET_FILTER } from 'ra-core/esm/reducer/admin/resource/list/queryReducer';

const emptyObject = {};

const defaultSort = {
    field: 'id',
    order: SORT_ASC
};

const defaultParams = {};

/**
 * Get the list parameters (page, sort, filters) and modifiers.
 *
 * These parameters are merged from 3 sources:
 *   - the query string from the URL
 *   - the params stored in the state (from previous navigation)
 *   - the options passed to the hook (including the filter defaultValues)
 *
 * @returns {Array} A tuple [parameters, modifiers].
 * Destructure as [
 *    { page, perPage, sort, order, filter, filterValues, displayedFilters, requestSignature },
 *    { setFilters, hideFilter, showFilter, setPage, setPerPage, setSort }
 * ]
 *
 * @example
 *
 * const [listParams, listParamsActions] = useListParams({
 *      resource: 'posts',
 *      location: location // From react-router. Injected to your component by react-admin inside a List
 *      filterDefaultValues: {
 *          published: true
 *      },
 *      sort: {
 *          field: 'published_at',
 *          order: 'DESC'
 *      },
 *      perPage: 25
 * });
 *
 * const {
 *      page,
 *      perPage,
 *      sort,
 *      order,
 *      filter,
 *      filterValues,
 *      displayedFilters,
 *      requestSignature
 * } = listParams;
 *
 * const {
 *      setFilters,
 *      hideFilter,
 *      showFilter,
 *      setPage,
 *      setPerPage,
 *      setSort,
 * } = listParamsActions;
 */
const useListParams = ({ resource, filterDefaultValues, sort = defaultSort, perPage = 10, debounce = 500 }) => {
    const [params, setParams] = useState(defaultParams);
    const requestSignature = [resource, params, filterDefaultValues, JSON.stringify(sort), perPage];

    const query = useMemo(
        () => getQuery({
            params,
            filterDefaultValues,
            sort,
            perPage
        }),
        requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );

    const changeParams = useCallback((action) => {
        const newParams = queryReducer(query, action);
        setParams(newParams);
        // history.push({ search: '' });
        // dispatch(changeListParams(resource, newParams));
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

    const setSort = useCallback(
        (newSort) => changeParams({ type: SET_SORT, payload: { sort: newSort } }),
        requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );

    const setPage = useCallback(
        (newPage) => changeParams({ type: SET_PAGE, payload: newPage }),
        requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );

    const setPerPage = useCallback(
        (newPerPage) => changeParams({ type: SET_PER_PAGE, payload: newPerPage }),
        requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );

    const filterValues = query.filter || emptyObject;
    const displayedFilterValues = query.displayedFilters || emptyObject;

    const debouncedSetFilters = lodashDebounce((newFilters, newDisplayedFilters) => {
        const payload = {
            filter: removeEmpty(newFilters),
            displayedFilters: undefined
        };
        if (newDisplayedFilters) {
            payload.displayedFilters = Object.keys(newDisplayedFilters).reduce(
                (filters, filter) => (newDisplayedFilters[filter] ? { ...filters, [filter]: true } : filters),
                {}
            );
        }
        changeParams({
            type: SET_FILTER,
            payload
        });
    }, debounce);

    const setFilters = useCallback(
        (filters, displayedFilters) => debouncedSetFilters(filters, displayedFilters),
        requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );

    const hideFilter = useCallback((filterName) => {
        const newFilters = removeKey(filterValues, filterName);
        const newDisplayedFilters = {
            ...displayedFilterValues,
            [filterName]: undefined
        };

        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

    const showFilter = useCallback((filterName, defaultValue) => {
        const newFilters = set(filterValues, filterName, defaultValue);
        const newDisplayedFilters = {
            ...displayedFilterValues,
            [filterName]: true
        };
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps

    return [
        {
            displayedFilters: displayedFilterValues,
            filterValues,
            requestSignature,
            ...query
        },
        {
            changeParams,
            setPage,
            setPerPage,
            setSort,
            setFilters,
            hideFilter,
            showFilter
        }
    ];
};

/**
 * Check if user has already set custom sort, page, or filters for this list
 *
 * User params come from the Redux store as the params props. By default,
 * this object is:
 *
 * { filter: {}, order: null, page: 1, perPage: null, sort: null }
 *
 * To check if the user has custom params, we must compare the params
 * to these initial values.
 *
 * @param {Object} params
 */
export const hasCustomParams = (params) => params
    && params.filter
    && (Object.keys(params.filter).length > 0 || params.order != null || params.page !== 1 || params.perPage != null || params.sort != null);

/**
 * Merge list params from 3 different sources:
 *   - the query string
 *   - the params stored in the state (from previous navigation)
 *   - the props passed to the List component (including the filter defaultValues)
 */
export const getQuery = ({ filterDefaultValues, params, sort, perPage }) => {
    const query = hasCustomParams(params) ? { ...params } : { filter: filterDefaultValues || {} };

    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }
    if (!query.perPage) {
        query.perPage = perPage;
    }
    if (!query.page) {
        query.page = 1;
    }
    return {
        ...query,
        page: getNumberOrDefault(query.page, 1),
        perPage: getNumberOrDefault(query.perPage, 10)
    };
};

export const getNumberOrDefault = (possibleNumber, defaultValue) => (typeof possibleNumber === 'string' ? parseInt(possibleNumber, 10) : possibleNumber) || defaultValue;

export default useListParams;
