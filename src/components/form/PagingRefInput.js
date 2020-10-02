import React, { useState, useCallback } from 'react';
import * as PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import { useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const getTotalReferenceRecord = (state, reference) => {
    const cachedRequests = state.admin.resources[reference] && state.admin.resources[reference].list.cachedRequests;
    const temp = Object.values(cachedRequests);
    if (temp && temp.length > 0) {
        const { total } = temp.pop();
        return total;
    }
    return 0;
};

const useStyles = makeStyles({
    root: {
        backgroundColor: 'var(--form-background-color)',
        '& button': {
            borderRadius: '4px !important',
            '&:hover, &[aria-current]': {
                background: 'var(--cyan)',
                color: 'var(--white)',
                borderColor: 'var(--cyan)'
            }
        }
    }
});

const PagingReferenceInput = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const { setPagination, perPage, reference } = props;
    const [page, setPage] = useState(1);
    const total = useSelector((state) => getTotalReferenceRecord(state, reference));
    const numberPages = Math.ceil(total / perPage) || 1;

    const handlePageChange = useCallback(
        async (event, nextPage) => {
            if (nextPage < 0 || nextPage > numberPages) {
                throw new Error(
                    translate('ra.navigation.page_out_of_boundaries', {
                        page: nextPage
                    })
                );
            }
            // TODO: change pagination to reference input call api fetch data
            setPagination({
                page: nextPage,
                perPage
            });

            setPage(nextPage);
        },
        [numberPages, perPage, setPagination, translate]
    );

    return (
        <Pagination
            classes={classes}
            className="w-100 py-1"
            boundaryCount={1}
            count={numberPages}
            page={page}
            size="small"
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
        />
    );
};

PagingReferenceInput.propTypes = {
    setPagination: PropTypes.func.isRequired,
    reference: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired
};

export default PagingReferenceInput;
