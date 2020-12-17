import { Card, makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { Children, cloneElement } from 'react';
import {
    BulkActionsToolbar,
    BulkDeleteButton,
    ComponentPropType,
    defaultExporter,
    ExporterContext,
    ListActions as DefaultActions,
    // Empty
    ListToolbar,
    Pagination as DefaultPagination,
    Title,
    TitlePropType,
    useCheckMinimumRequiredProps
} from 'react-admin';
import { getListControllerProps } from './useListController';

const spaceTableStyle = {
    backgroundColor: 'var(--table-odd)',
    margin: '0 15px'
};

const ListView = (props) => {
    const {
        actions,
        aside,
        filter,
        filters,
        bulkActionButtons,
        pagination,
        children,
        className,
        classes: classesOverride,
        component: Content,
        exporter = defaultExporter,
        title,
        empty,
        splitPagination,
        ...rest
    } = props;
    useCheckMinimumRequiredProps('List', ['children'], props);
    const classes = useStyles(props);
    const { defaultTitle, version, total, loaded, loading, hasCreate, filterValues } = rest;
    const controllerProps = getListControllerProps(rest);

    const renderList = () => (
        <>
            {(filters || actions) && (
                <ListToolbar
                    filters={filters}
                    {...controllerProps}
                    actions={actions}
                    exporter={exporter} // deprecated, use ExporterContext instead
                    permanentFilter={filter}
                />
            )}
            <div className={classes.main}>
                <Content
                    className={classnames(classes.content, {
                        [classes.bulkActionsDisplayed]: controllerProps.selectedIds.length > 0
                    })}
                    key={version}
                >
                    {bulkActionButtons !== false && bulkActionButtons && (
                        <BulkActionsToolbar {...controllerProps}>{bulkActionButtons}</BulkActionsToolbar>
                    )}
                    {children
                        && cloneElement(Children.only(children), {
                            ...controllerProps,
                            hasBulkActions: bulkActionButtons !== false
                        })}
                    {!splitPagination && pagination && cloneElement(pagination, controllerProps)}
                </Content>
                {aside && cloneElement(aside, controllerProps)}
            </div>
        </>
    );

    const shouldRenderEmptyPage = hasCreate && loaded && !loading && !total && !Object.keys(filterValues).length;

    return (
        <ExporterContext.Provider value={exporter}>
            <div className={classnames('list-page', 'd-flex flex-column', classes.root, className)} {...sanitizeRestProps(rest)}>
                <Title title={title} defaultTitle={defaultTitle} />
                {shouldRenderEmptyPage ? cloneElement(empty, controllerProps) : renderList()}
                {/* vùng trắng giữa bang và pagination khi phần tử của bảng không đủ để full height của bảng */}
                {splitPagination && (<div className="flex-1" style={spaceTableStyle} />)}
                {splitPagination && pagination && cloneElement(pagination, { ...controllerProps, splitPagination: true })}
            </div>
        </ExporterContext.Provider>
    );
};

ListView.propTypes = {
    actions: PropTypes.element,
    aside: PropTypes.element,
    basePath: PropTypes.string,
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    component: ComponentPropType,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string
    }),
    data: PropTypes.object,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: TitlePropType,
    total: PropTypes.number,
    version: PropTypes.number,
    filter: PropTypes.any,
    empty: PropTypes.any,
    splitPagination: PropTypes.bool
};

const DefaultBulkActionButtons = (props) => <BulkDeleteButton {...props} />;

ListView.defaultProps = {
    actions: <DefaultActions />,
    classes: {},
    component: Card,
    bulkActionButtons: <DefaultBulkActionButtons />,
    pagination: <DefaultPagination />
    // eslint-disable-next-line react/default-props-match-prop-types
    // empty: <Empty />
};

const useStyles = makeStyles(
    (theme) => ({
        root: {},
        main: {
            display: 'flex'
        },
        content: {
            marginTop: 0,
            transition: theme.transitions.create('margin-top'),
            position: 'relative',
            flex: '1 1 auto',
            [theme.breakpoints.down('xs')]: {
                boxShadow: 'none'
            },
            overflow: 'inherit'
        },
        bulkActionsDisplayed: {
            marginTop: -theme.spacing(8),
            transition: theme.transitions.create('margin-top')
        },
        actions: {
            zIndex: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
        },
        noResults: { padding: 20 }
    }),
    { name: 'RaList' }
);

const sanitizeRestProps = ({
    actions,
    basePath,
    changeListParams,
    children,
    classes,
    className,
    crudGetList,
    currentSort,
    data,
    defaultTitle,
    displayedFilters,
    exporter,
    filter,
    filterDefaultValues,
    filters,
    filterValues,
    hasCreate,
    hasEdit,
    hasList,
    hasShow,
    hideFilter,
    history,
    ids,
    loading,
    loaded,
    locale,
    location,
    match,
    onSelect,
    onToggleItem,
    onUnselectItems,
    options,
    page,
    pagination,
    params,
    permissions,
    perPage,
    push,
    query,
    refresh,
    resource,
    selectedIds,
    setFilters,
    setPage,
    setPerPage,
    setSelectedIds,
    setSort,
    showFilter,
    sort,
    title,
    toggleItem,
    total,
    version,
    empty,
    ...rest
}) => rest;

export default ListView;
