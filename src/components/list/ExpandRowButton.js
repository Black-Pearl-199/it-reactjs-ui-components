import { IconButton } from '@material-ui/core';
import { ExpandMoreIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';

const ExpandRowButton = ({ classes, expanded, expandContentId, ...props }) => {
    const translate = useTranslate();
    return (
        <IconButton
            aria-label={translate(expanded ? 'ra.action.close' : 'ra.action.expand')}
            aria-expanded={expanded}
            aria-controls={expandContentId}
            className={classNames(classes.expandIcon, {
                [classes.expanded]: expanded
            })}
            component="div"
            tabIndex={-1}
            aria-hidden="true"
            {...props}
        >
            <ExpandMoreIcon />
        </IconButton>
    );
};

ExpandRowButton.propTypes = {
    classes: {
        expandIcon: PropTypes.string,
        expanded: PropTypes.string
    },
    expanded: PropTypes.bool,
    expandContentId: PropTypes.string,
    locale: PropTypes.string
};

export default ExpandRowButton;
