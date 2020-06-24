import React from 'react';
import { List } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { listStylesNoActionsList } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

export default (props) => {
    const classes = useStyles();
    return <List {...props} classes={classes} />;
};
