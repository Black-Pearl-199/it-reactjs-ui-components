import { Checkbox, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { Children, cloneElement, isValidElement } from 'react';
import { DatagridLoading, sanitizeListRestProps } from 'react-admin';
import { myDataGridStyle } from '../MyCustomStyles';
import MyDatagridBody from './MyDatagridBody';
import MyDatagridHeaderCell from './MyDatagridHeaderCell';

const useStyles = makeStyles((props) => myDataGridStyle);

/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - rowStyle
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
const MyDatagrid = (props) => {
    const classes = useStyles(props);
    const updateSort = (event) => {
        event.stopPropagation();
        props.setSort(event.currentTarget.dataset.sort);
    };

    const handleSelectAll = (event) => {
        const { onSelect, ids, selectedIds } = props;
        if (event.target.checked) {
            onSelect(
                ids.reduce(
                    (idList, id) => (idList.includes(id) ? idList : idList.concat(id)),

                    selectedIds
                )
            );
        } else {
            onSelect([]);
        }
    };

    const {
        basePath,
        body,
        checkToggle,
        children,
        className,
        currentSort,
        data,
        expand,
        hasBulkActions,
        hover,
        ids,
        loading,
        loaded,
        onSelect,
        onToggleItem,
        resource,
        rowClick,
        handleDoubleClick,
        handleRightClick,
        rowStyle,
        selectedIds,
        setSort,
        total,
        version,
        ...rest
    } = props;

    /**
     * if loaded is false, the list displays for the first time, and the dataProvider hasn't answered yet
     * if loaded is true, the data for the list has at least been returned once by the dataProvider
     * if loaded is undefined, the Datagrid parent doesn't track loading state (e.g. ReferenceArrayField)
     */
    if (loaded === false) {
        return (
            <DatagridLoading
                classes={classes}
                className={className}
                expand={expand}
                hasBulkActions={hasBulkActions}
                nbChildren={Children.count(children)}
            />
        );
    }

    /**
     * Once loaded, the data for the list may be empty. Instead of
     * displaying the table header with zero data rows,
     * the datagrid displays nothing in this case.
     */
    // if (!loading && (ids.length === 0 || total === 0)) {
    //     return null;
    // }

    /**
     * After the initial load, if the data for the list isn't empty,
     * and even if the data is refreshing (e.g. after a filter change),
     * the datagrid displays the current data.
     */
    return (
        <Table className={classNames(classes.root, className)} {...sanitizeListRestProps(rest)}>
            <TableHead className={classNames(classes.thead, 'table-itech-thread')}>
                <TableRow className={classNames(classes.row, classes.headerRow)}>
                    {expand && <TableCell className={classNames(classes.expandHeader, classes.headerCell)} />}
                    {hasBulkActions && (
                        <TableCell padding="none" className={classes.headerCell} style={{ width: '1%' }}>
                            <Checkbox
                                className="select-all"
                                color="primary"
                                checked={selectedIds.length > 0 && ids.length > 0 && !ids.find((it) => selectedIds.indexOf(it) === -1)}
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                    )}
                    {Children.map(children, (field, index) => (isValidElement(field) ? (
                        <MyDatagridHeaderCell
                            className={classes.headerCell}
                            currentSort={currentSort}
                            field={field}
                            isSorting={currentSort.field === (field.props.sortBy || field.props.source)}
                            key={field.props.source || index}
                            resource={resource}
                            updateSort={updateSort}
                            style={field.props.headerStyle}
                        />
                    ) : null))}
                </TableRow>
            </TableHead>
            {ids.length === 0 || total === 0 ? (
                <TableBody />
            ) : (
                cloneElement(
                    body,
                    {
                        basePath,
                        checkToggle,
                        className: classes.tbody,
                        classes,
                        expand,
                        rowClick,
                        handleDoubleClick,
                        handleRightClick,
                        data,
                        hasBulkActions,
                        hover,
                        ids,
                        loading,
                        onToggleItem,
                        onSelect,
                        resource,
                        rowStyle,
                        selectedIds,
                        version,
                        total
                    },
                    children
                )
            )}
        </Table>
    );
};

MyDatagrid.propTypes = {
    basePath: PropTypes.string,
    body: PropTypes.element.isRequired,
    checkToggle: PropTypes.func,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    currentSort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string
    }),
    data: PropTypes.object.isRequired,
    expand: PropTypes.node,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    setSort: PropTypes.func,
    total: PropTypes.number,
    version: PropTypes.number,
    loaded: PropTypes.bool,
    heightCustom: PropTypes.bool,
    handleDoubleClick: PropTypes.func,
    handleRightClick: PropTypes.func
};

MyDatagrid.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    selectedIds: [],
    body: <MyDatagridBody />
};

export default MyDatagrid;
