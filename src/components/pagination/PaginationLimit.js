import React from 'react';
import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';

const PaginationLimit = ({ labelLimit }) => {
    const translate = useTranslate();
    return (
        <div>
            <p>
                {translate(labelLimit)}
            </p>
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
