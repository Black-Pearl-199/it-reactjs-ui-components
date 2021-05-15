import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { any, bool, func, node, object, oneOfType, string } from 'prop-types';
import React, { isValidElement, useCallback, useEffect, useState } from 'react';
import { DatagridCell, linkToRecord, useExpanded } from 'react-admin';
import { useDispatch } from 'react-redux';
import ExpandRowButton from './ExpandRowButton';
import ROW_CLICK from './RowClick';

const computeNbColumns = (expand, children, hasBulkActions) => (expand
    ? 1 // show expand button
    + (hasBulkActions ? 1 : 0) // checkbox column
    + React.Children.toArray(children).filter((child) => !!child).length // non-null children
    : 0); // we don't need to compute columns if there is no expand panel;

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
    handleDoubleClick,
    handleRightClick,
    ...rest
}) => rest;

const MyDatagridRow = (props) => {
    const {
        basePath,
        checkToggle,
        children,
        classes,
        className,
        expand,
        hasBulkActions,
        hover,
        id,
        onSelect,
        onToggleItem,
        record,
        resource,
        rowClick,
        handleDoubleClick,
        handleRightClick,
        hasCheckboxAction,
        selected,
        style,
        styles,
        ...rest
    } = props;

    const [expanded, toggleExpanded] = useExpanded(resource, id);
    const [nbColumns, setNbColumns] = useState(computeNbColumns(expand, children, hasBulkActions));
    const dispatch = useDispatch();

    useEffect(() => {
        // Fields can be hidden dynamically based on permissions;
        // The expand panel must span over the remaining columns
        // So we must recompute the number of columns to span on
        const newNbColumns = computeNbColumns(expand, children, hasBulkActions);
        if (newNbColumns !== nbColumns) {
            setNbColumns(newNbColumns);
        }
    }, [expand, nbColumns, children, hasBulkActions]);

    const handleToggleExpand = useCallback(
        (event) => {
            toggleExpanded();
            event.stopPropagation();
        },
        [toggleExpanded]
    );

    const handleClickCheckbox = useCallback((onToggleItem, id) => ({
        ...onToggleItem(id),
        checkboxClick: true
    }), []);

    const handleToggleSelection = useCallback(
        async (event) => {
            if (onToggleItem) {
                if (!checkToggle || checkToggle(id)) handleClickCheckbox(onToggleItem, id);
                event.stopPropagation();
            } else if (hasCheckboxAction) {
                if (!rowClick) return;
                event.stopPropagation();

                await rowClick(id, basePath, record, hasCheckboxAction);
            }
        },
        [onToggleItem, hasCheckboxAction, checkToggle, id, handleClickCheckbox, rowClick, basePath, record]
    );

    const handleClick = useCallback(
        async (event) => {
            if (!rowClick) return;
            event.persist();

            const effect = typeof rowClick === 'function' ? await rowClick(id, basePath, record) : rowClick;
            switch (effect) {
                case ROW_CLICK.EDIT:
                    dispatch(push(linkToRecord(basePath, id)));
                    break;
                case ROW_CLICK.SHOW:
                    dispatch(push(linkToRecord(basePath, id, 'show')));
                    break;
                case ROW_CLICK.EXPAND:
                    handleToggleExpand(event);
                    break;
                case ROW_CLICK.TOGGLE_SELECTION:
                    handleToggleSelection(event);
                    break;
                case ROW_CLICK.SELECT_ONE:
                    onSelect([id]);
                    break;
                case ROW_CLICK.UN_SELECT_ONE:
                    onSelect([]);
                    break;
                default:
                    if (effect) dispatch(push(effect));
                    break;
            }
        },
        [basePath, dispatch, handleToggleExpand, handleToggleSelection, id, onSelect, record, rowClick]
    );

    const onDoubleClick = useCallback((event) => {
        if (!handleDoubleClick) return;
        event.preventDefault();
        event.stopPropagation();
        handleDoubleClick(id, record);
    }, [handleDoubleClick, id, record]);

    const onContextMenu = useCallback((event) => {
        if (!handleRightClick) return;
        event.preventDefault();
        event.stopPropagation();
        handleRightClick(id, record, event);
    }, [handleRightClick, id, record]);

    return (
        <>
            <TableRow
                className={classNames(className, selected ? 'active' : '')}
                key={id}
                style={style}
                hover={hover}
                onClick={handleClick}
                onDoubleClick={onDoubleClick}
                onContextMenu={onContextMenu}
                {...sanitizeRestProps(rest)}
            >
                {expand && (
                    <TableCell padding="none" className={classes.expandIconCell}>
                        <ExpandRowButton
                            classes={classes}
                            expanded={expanded}
                            expandContentId={`${id}-expand`}
                            onClick={handleToggleExpand}
                        />
                    </TableCell>
                )}
                {hasBulkActions && (
                    <TableCell padding="none">
                        <Checkbox
                            color="primary"
                            className={`select-item ${classes.checkbox}`}
                            checked={selected}
                            onClick={handleToggleSelection}
                        />
                    </TableCell>
                )}
                {React.Children.map(children, (field, index) => (isValidElement(field) ? (
                    <DatagridCell
                        key={`${id}-${field.props.source || index}`}
                        className={classNames(`column-${field.props.source}`, classes.rowCell)}
                        record={record}
                        {...{ field, basePath, resource }}
                    />
                ) : null))}
            </TableRow>
            {expand && expanded && (
                <TableRow key={`${id}-expand`} id={`${id}-expand`}>
                    <TableCell colSpan={nbColumns}>
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
    basePath: string,
    checkToggle: func,
    children: node,
    classes: object,
    className: string,
    expand: node,
    hasBulkActions: bool.isRequired,
    hover: bool,
    id: any,
    onToggleItem: func,
    onSelect: func,
    record: object.isRequired,
    resource: string,
    rowClick: oneOfType([string, func]),
    selected: bool,
    style: object,
    styles: object,
    handleDoubleClick: func,
    handleRightClick: func,
    hasCheckboxAction: bool
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
