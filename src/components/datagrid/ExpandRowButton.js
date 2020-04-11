import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withTranslate } from 'ra-core';
import React from 'react';

const ExpandRowButton = ({
    classes,
    expanded,
    expandContentId,
    translate,
    ...props
}) => (
    <IconButton
        aria-label={translate(
            expanded ? 'ra.action.close' : 'ra.action.expand'
        )}
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

ExpandRowButton.propTypes = {
    classes: {
        expandIcon: PropTypes.string,
        expanded: PropTypes.string
    },
    expanded: PropTypes.bool,
    expandContentId: PropTypes.string,
    translate: PropTypes.func,
    locale: PropTypes.string
};

export default withTranslate(ExpandRowButton);
