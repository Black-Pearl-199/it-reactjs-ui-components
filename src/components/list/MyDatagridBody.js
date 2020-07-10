import TableBody from '@material-ui/core/TableBody';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import MyDatagridRow from './MyDatagridRow';

const MyDatagridBodyView = ({
    basePath,
    checkToggle,
    children,
    classes,
    className,
    data,
    expand,
    hasBulkActions,
    hover,
    ids,
    loading,
    onToggleItem,
    onSelect,
    resource,
    row,
    rowClick,
    rowStyle,
    selectedIds,
    styles,
    version,
    ...rest
}) => (
    <TableBody className={classNames('datagrid-body', className)} {...rest}>
        {ids.map((id, rowIndex) => React.cloneElement(
            row,
            {
                basePath,
                checkToggle,
                classes,
                className: classNames(classes.row, {
                    [classes.rowEven]: rowIndex % 2 === 0,
                    [classes.rowOdd]: rowIndex % 2 !== 0,
                    [classes.clickableRow]: rowClick
                }),
                expand,
                hasBulkActions,
                hover,
                id,
                key: id,
                onToggleItem,
                record: data[id],
                resource,
                rowClick,
                onSelect,
                selected: selectedIds.includes(id),
                style: rowStyle ? rowStyle(data[id], rowIndex) : null
            },
            children
        ))}
    </TableBody>
);

MyDatagridBodyView.propTypes = {
    basePath: PropTypes.string,
    checkToggle: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    expand: PropTypes.node,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    loading: PropTypes.bool,
    onToggleItem: PropTypes.func,
    onSelect: PropTypes.func,
    resource: PropTypes.string,
    row: PropTypes.element.isRequired,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    styles: PropTypes.object,
    version: PropTypes.number
};

MyDatagridBodyView.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: <MyDatagridRow />
};

const areArraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

const MyDatagridBody = shouldUpdate(
    (props, nextProps) => props.version !== nextProps.version
        || nextProps.loading === false
        || !areArraysEqual(props.ids, nextProps.ids)
        || props.data !== nextProps.data
)(MyDatagridBodyView);

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
MyDatagridBody.muiName = 'TableBody';

export default MyDatagridBody;
