import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import React from 'react';

import { RedirectCreateButton } from '../button';
import { paginationStyles } from '../MyCustomStyles';
import Pagination from './Pagination';

const sanitizeProps = ({
    setPage, setPerPage, perPage, page, total, ...rest
}) => rest;
const classes = makeStyles(paginationStyles);

const MyCustomPagination = ((props) => {
    // console.log('custom pagination', props)
    const {
        children, basePath, createBtn, ...rest
    } = props;

    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { ...sanitizeProps(rest) }));

    return (
        <div
            className="d-flex flex-row-reverse flex-nowrap flex-grow-1 flex-shrink-1 justify-content-between py-1"
        >
            <Pagination {...rest} className={classes.pagination} />
            <div className="d-flex flex-column justify-content-around my-auto">
                {childrenWithProps}
                {createBtn ? <RedirectCreateButton basePath={basePath} /> : null}
            </div>
        </div>
    );
});

MyCustomPagination.propTypes = {
    basePath: PropTypes.string,
    createBtn: PropTypes.bool,
    children: PropTypes.any
};

export default MyCustomPagination;
