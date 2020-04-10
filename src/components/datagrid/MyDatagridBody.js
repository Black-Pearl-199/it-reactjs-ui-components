import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import TableBody from '@material-ui/core/TableBody';
import classNames from 'classnames';
import MyDatagridRow from './MyDatagridRow';

const MyDatagridBody = ({
    basePath,
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

MyDatagridBody.propTypes = {
    basePath: PropTypes.string,
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

MyDatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: <MyDatagridRow />
};

const areArraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

const PureDatagridBody = shouldUpdate(
    (props, nextProps) => props.version !== nextProps.version
        || nextProps.loading === false
        || !areArraysEqual(props.ids, nextProps.ids)
        || props.data !== nextProps.data
)(MyDatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
