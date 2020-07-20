import React from 'react';
import { List } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { useMeasure } from 'react-use';

import { listStylesNoActionsList, tableMaxHeight } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

export default (props) => {
    const [ref, { height }] = useMeasure();
    const classes = useStyles();
    if (height) {
        tableMaxHeight.maxHeight = `${height - 70}px`;
    }
    return (
        <div ref={ref} className="w-100 h-100">
            <List {...props} classes={classes} />
        </div>
    );
};
