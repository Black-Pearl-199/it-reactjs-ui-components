import React from 'react';
import { Edit } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { formStyles } from '../MyCustomStyles';

const useStyles = makeStyles(formStyles, { name: 'Bass-FS' });

export default (props) => {
    const classes = useStyles();
    return <Edit {...props} classes={classes} />;
};
