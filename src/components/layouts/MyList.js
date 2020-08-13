import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useMeasure } from 'react-use';
import * as PropTypes from 'prop-types';

import List from '../list/List';
import { listStylesNoActionsList } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

const MyList = React.memo((props) => {
    const [ref, { height }] = useMeasure();
    const classes = useStyles();
    const { pagination } = props;
    let tableMaxHeight = '100%';
    if (height) {
        tableMaxHeight = pagination ? height - 40 : height;
    }
    return (
        <div ref={ref} className="w-100 h-100 position-absolute pos-reset">
            <List {...props} classes={classes} maxHeight={tableMaxHeight} />
        </div>
    );
});

MyList.propTypes = {
    pagination: PropTypes.any
};

export default MyList;
