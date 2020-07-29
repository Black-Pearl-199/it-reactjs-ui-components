import React from 'react';
import { List } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { useMeasure } from 'react-use';
import * as PropTypes from 'prop-types';

import { listStylesNoActionsList, tableMaxHeight } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

const MyList = React.memo((props) => {
    const [ref, { height }] = useMeasure();
    const classes = useStyles();
    const { pagination } = props;
    if (height) {
        tableMaxHeight.maxHeight = pagination ? height - 40 : height;
    }
    return (
        <div ref={ref} className="w-100 h-100 position-absolute pos-reset">
            <List {...props} classes={classes} />
        </div>
    );
});

MyList.propTypes = {
    pagination: PropTypes.any
};

export default MyList;
