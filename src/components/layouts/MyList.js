import React from 'react';
import { List } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { useMeasure } from 'react-use';

import { listStylesNoActionsList } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

export default (props) => {
    const classes = useStyles();
    const [ref, { height }] = useMeasure();
    return (
        <div ref={ref} className="w-100 h-100">
            <List {...props} classes={classes} />
        </div>
    );
};
