import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { pure } from 'recompose';

const classes = (theme) => makeStyles({
    actions: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: 20
    },
    hellip: { padding: '1.2em' }
});
const PaginationActions = (props) => {
    /**
     * Warning: material-ui's page is 0-based
     */
    const translate = useTranslate();
    const range = () => {
        const { page, rowsPerPage, count } = props;
        const nbPages = Math.ceil(count / rowsPerPage) || 1;
        if (isNaN(page) || nbPages === 1) {
            return [];
        }
        const input = [];
        // display page links around the current page
        if (page > 1) {
            input.push(1);
        }
        if (page === 3) {
            input.push(2);
        }
        if (page > 3) {
            input.push('.');
        }
        if (page > 0) {
            input.push(page);
        }
        input.push(page + 1);
        if (page < nbPages - 1) {
            input.push(page + 2);
        }
        if (page === nbPages - 4) {
            input.push(nbPages - 1);
        }
        if (page < nbPages - 4) {
            input.push('.');
        }
        if (page < nbPages - 2) {
            input.push(nbPages);
        }

        return input;
    };

    const getNbPages = () => Math.ceil(props.count / props.rowsPerPage) || 1;

    const prevPage = (event) => {
        if (props.page === 0) {
            throw new Error(
                translate('ra.navigation.page_out_from_begin')
            );
        }
        props.onChangePage(event, props.page - 1);
    };

    const nextPage = (event) => {
        if (props.page > getNbPages() - 1) {
            throw new Error(
                translate('ra.navigation.page_out_from_end')
            );
        }
        props.onChangePage(event, props.page + 1);
    };

    const gotoPage = (event) => {
        const page = parseInt(event.currentTarget.dataset.page, 10);
        if (page < 0 || page > getNbPages() - 1) {
            throw new Error(
                translate('ra.navigation.page_out_of_boundaries', {
                    page: page + 1
                })
            );
        }
        props.onChangePage(event, page);
    };

    const renderPageNums = () => {
        const { classes } = props;

        return range().map((pageNum, index) => (pageNum === '.' ? (
            <span key={`hyphen_${index}`} className={classes.hellip}>
                &hellip;
            </span>
        ) : (
            <li
                className={`page-number page-item ${pageNum === props.page + 1 ? 'active' : ''}`}
                key={pageNum}
                data-page={pageNum - 1}
                onClick={gotoPage}
            >
                <div className="page-link">
                    {pageNum}
                </div>
            </li>
        )));
    };


    const { page } = props;

    const nbPages = getNbPages();
    if (nbPages === 1) return <div className={classes.actions} />;
    return (
        <ul className="ml-3 my-0 pagination pagination-itech">
            {page > 0 && (
                <li
                    // color="primary"
                    key="prev"
                    onClick={prevPage}
                    className="previous-page page-item"
                >
                    <div className="page-link">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    {/* {translate('ra.navigation.prev')} */}
                </li>
            )}
            {renderPageNums()}
            {page !== nbPages - 1 && (
                <li
                    // color="primary"
                    key="next"
                    onClick={nextPage}
                    className="next-page page-item"
                >
                    {/* {translate('ra.navigation.next')} */}
                    <div className="page-link">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </li>
            )}
        </ul>
    );
};

PaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    classes: PropTypes.object
};

export default pure(PaginationActions);
