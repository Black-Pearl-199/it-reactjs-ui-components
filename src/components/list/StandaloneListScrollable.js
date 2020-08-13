import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useMeasure } from 'react-use';
import * as PropTypes from 'prop-types';

import { listStylesNoActionsList } from '../MyCustomStyles';
import MyStandaloneList from './MyStandaloneList';

const useStyles = makeStyles(listStylesNoActionsList, { name: 'Bass-LSNAL' });

const StandaloneListScrollable = React.memo((props) => {
    const [ref, { height }] = useMeasure();
    const classes = useStyles();
    const { pagination } = props;
    let tableMaxHeight = '100%';
    if (height) {
        tableMaxHeight = pagination ? height - 40 : height;
    }
    return (
        <div ref={ref} className="w-100 h-100 position-absolute pos-reset">
            <MyStandaloneList {...props} classes={classes} maxHeight={tableMaxHeight} />
        </div>
    );
});

StandaloneListScrollable.propTypes = {
    pagination: PropTypes.any
};

export default StandaloneListScrollable;
