import { makeStyles, TableCell, TableSortLabel, Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FieldTitle, useTranslate } from 'react-admin';
import shouldUpdate from 'recompose/shouldUpdate';

// remove the sort icons when not active
const useStyles = makeStyles(
    {
        icon: {
            display: 'none'
        },
        active: {
            '& $icon': {
                display: 'inline'
            }
        },
        root: {
            '&$active': {
                '&& $icon': {
                    // arrow icon on header
                    opacity: 1,
                    color: 'var(--main-color-contrast)'
                }
            }
        }
    },
    { name: 'RaDatagridHeaderCell' }
);

const DatagridHeaderCell = (props) => {
    const { className, classes: classesOverride, field, currentSort, updateSort, resource, isSorting, ...rest } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    return (
        <TableCell className={classnames(className, field.props.headerClassName)} align={field.props.textAlign} {...rest}>
            {field.props.sortable !== false && (field.props.sortBy || field.props.source) ? (
                <Tooltip
                    title={translate('ra.action.sort')}
                    placement={field.props.textAlign === 'right' ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                >
                    <TableSortLabel
                        active={currentSort.field === (field.props.sortBy || field.props.source)}
                        direction={currentSort.order === 'ASC' ? 'asc' : 'desc'}
                        data-sort={field.props.sortBy || field.props.source}
                        onClick={updateSort}
                        classes={classes}
                    >
                        <FieldTitle label={field.props.label} source={field.props.source} resource={resource} />
                    </TableSortLabel>
                </Tooltip>
            ) : (
                <FieldTitle label={field.props.label} source={field.props.source} resource={resource} />
            )}
        </TableCell>
    );
};

DatagridHeaderCell.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    field: PropTypes.element,
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
        field: PropTypes.string
    }).isRequired,
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func.isRequired
};

export default shouldUpdate(
    (props, nextProps) => props.updateSort !== nextProps.updateSort
        || props.currentSort.sort !== nextProps.currentSort.sort
        || props.currentSort.order !== nextProps.currentSort.order
        || (nextProps.isSorting && props.sortable !== nextProps.sortable)
)(DatagridHeaderCell);
