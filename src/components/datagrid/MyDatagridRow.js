import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { linkToRecord, DatagridCell } from 'react-admin';
import React, { isValidElement, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { push } from 'react-router-redux';

import ExpandRowButton from './ExpandRowButton';
import ROW_CLICK from './RowClick';

const sanitizeRestProps = ({
    basePath,
    children,
    classes,
    className,
    rowClick,
    id,
    loading,
    onToggleItem,
    record,
    resource,
    selected,
    style,
    styles,
    ...rest
}) => rest;

const MyDatagridRow = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [colSpan, setColSpan] = useState(computeColSpan(props));
    const dispatch = useDispatch();

    useEffect(() => {
        const newColSpan = computeColSpan(props);
        if (colSpan !== newColSpan) {
            setColSpan(newColSpan);
        }
    }, [colSpan, props]);

    const handleToggleExpanded = (event) => {
        setExpanded(!expanded);
        event.stopPropagation();
    };

    const handleToggle = (event) => {
        props.onToggleItem(props.id);
        event.stopPropagation();
    };

    const handleClick = async (event) => {
        const { basePath, rowClick, id, record } = props;

        if (!rowClick) return;

        if (typeof rowClick === 'function') {
            const path = await rowClick(id, basePath, record);
            handleRedirection(path, event);
            return;
        }

        handleRedirection(rowClick, event);
    };

    const handleRedirection = (path, event) => {
        const { basePath, id } = props;

        if (path === ROW_CLICK.EDIT) {
            dispatch(push(linkToRecord(basePath, id)));
            return;
        }
        if (path === ROW_CLICK.SHOW) {
            dispatch(push(linkToRecord(basePath, id, 'show')));
            return;
        }
        if (path === ROW_CLICK.EXPAND) {
            handleToggleExpanded(event);
            return;
        }
        if (path === ROW_CLICK.SELECT_ONE) {
            props.onSelect([props.id]);
            return;
        }
        if (path === ROW_CLICK.UN_SELECT_ONE) {
            props.onSelect([]);
            return;
        }
        if (!path) return;

        dispatch(push(path));
    };

    function computeColSpan(props) {
        const { children, hasBulkActions } = props;
        return (
            1 // show expand button
            + (hasBulkActions ? 1 : 0) // checkbox column
            + React.Children.toArray(children).filter((child) => !!child).length // non-null children
        );
    }

    const {
        basePath,
        children,
        classes,
        className,
        expand,
        hasBulkActions,
        hover,
        id,
        record,
        resource,
        selected,
        style,
        styles,
        ...rest
    } = props;
    return (
        <>
            <TableRow
                className={classNames(className, selected ? 'active' : '')}
                key={id}
                style={style}
                hover={hover}
                onClick={handleClick}
                {...sanitizeRestProps(rest)}
            >
                {expand && (
                    <TableCell
                        padding="none"
                        className={classes.expandIconCell}
                    >
                        <ExpandRowButton
                            classes={classes}
                            expanded={expanded}
                            expandContentId={`${id}-expand`}
                            onClick={handleToggleExpanded}
                        />
                    </TableCell>
                )}
                {hasBulkActions && (
                    <TableCell padding="none">
                        <Checkbox
                            color="primary"
                            className={`select-item ${classes.checkbox}`}
                            checked={selected}
                            onClick={handleToggle}
                        />
                    </TableCell>
                )}
                {React.Children.map(children, (field, index) => (isValidElement(field) ? (
                    <DatagridCell
                        key={`${id}-${field.props.source || index}`}
                        className={classNames(
                            `column-${field.props.source}`,
                            classes.rowCell
                        )}
                        record={record}
                        {...{ field, basePath, resource }}
                    />
                ) : null
                ))}
            </TableRow>
            {expand && expanded && (
                <TableRow key={`${id}-expand`} id={`${id}-expand`}>
                    <TableCell colSpan={colSpan}>
                        {React.cloneElement(expand, {
                            record,
                            basePath,
                            resource,
                            id: String(id)
                        })}
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

MyDatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.node,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    onSelect: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selected: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object
};

MyDatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false
};

// wat? TypeScript looses the displayName if we don't set it explicitly
MyDatagridRow.displayName = 'DatagridRow';

export default MyDatagridRow;
