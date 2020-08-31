import { TablePagination } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Responsive, sanitizeListRestProps, useTranslate } from 'react-admin';
import { pure } from 'recompose';
import PaginationActions from './PaginationActions';
import PaginationLimit from './PaginationLimit';

const emptyArray = [];

const Pagination = pure((props) => {
    const translate = useTranslate();
    const { page, setPage } = props;
    useEffect(() => {
        if (page < 1 || isNaN(page)) {
            setPage(1);
        }
    }, [page, setPage]);

    const getNbPages = () => Math.ceil(props.total / props.perPage) || 1;

    /**
     * Warning: material-ui's page is 0-based
     */
    const handlePageChange = (event, nextPage) => {
        // eslint-disable-next-line no-unused-expressions
        event && event.stopPropagation();
        if (nextPage < 0 || nextPage > getNbPages() - 1) {
            throw new Error(
                translate('ra.navigation.page_out_of_boundaries', {
                    page: nextPage + 1
                })
            );
        }
        props.setPage(nextPage + 1);
    };

    const handlePerPageChange = (event) => {
        props.setPerPage(event.target.value);
    };

    const labelDisplayedRows = ({ from, to, count }) => translate('ra.navigation.page_range_info', {
        offsetBegin: from,
        offsetEnd: to,
        total: count
    });

    const { loading, perPage, rowsPerPageOptions, total, labelPerPage, labelLimit, ...rest } = props;

    if (!loading && total === 0) {
        return <PaginationLimit labelLimit={labelLimit} />;
    }

    return (
        <Responsive
            small={(
                <TablePagination
                    count={total}
                    rowsPerPage={perPage}
                    page={page - 1}
                    onChangePage={handlePageChange}
                    rowsPerPageOptions={emptyArray}
                    component="span"
                    labelDisplayedRows={labelDisplayedRows}
                    {...sanitizeListRestProps(rest)}
                />
            )}
            medium={(
                <TablePagination
                    count={total}
                    rowsPerPage={perPage}
                    page={page - 1}
                    onChangeRowsPerPage={handlePerPageChange}
                    onChangePage={handlePageChange}
                    ActionsComponent={PaginationActions}
                    component="div"
                    labelRowsPerPage={translate(labelPerPage)}
                    labelDisplayedRows={labelDisplayedRows}
                    rowsPerPageOptions={rowsPerPageOptions}
                    {...sanitizeListRestProps(rest)}
                />
            )}
        />
    );
});

Pagination.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    total: PropTypes.number,
    labelPerPage: PropTypes.string,
    labelLimit: PropTypes.string
};

Pagination.defaultProps = {
    rowsPerPageOptions: [10, 25, 50],
    labelPerPage: 'ra.navigation.page_rows_per_page'
};

export default Pagination;
