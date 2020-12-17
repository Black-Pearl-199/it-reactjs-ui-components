import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';

const PaginationLimit = ({ labelLimit }) => {
    const translate = useTranslate();
    return (
        <div className="d-flex justify-content-center w-100">
            <span>
                {translate(labelLimit)}
            </span>
        </div>
    );
};

PaginationLimit.propTypes = {
    labelLimit: PropTypes.string
};

PaginationLimit.defaultProps = {
    labelLimit: 'ra.navigation.no_results'
};

export default React.memo(PaginationLimit);
