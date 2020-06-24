import React from 'react';
import { Edit } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { listStylesNoActions } from '../MyCustomStyles';

const useStyles = makeStyles(listStylesNoActions, { name: 'Bass-FS' });

export default (props) => {
    const classes = useStyles();
    return <Edit {...props} classes={classes} />;
};
