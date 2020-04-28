import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Toolbar } from 'react-admin';
import { MySaveButton } from './MySaveButton';

const MySaveToolbar = (props) => {
    const {
        children, callback, className, beforeSubmit, convertValue, customAction, customButton, hideNotification, customNotification, hideSaveButton, ...rest
    } = props;
    const { invalid, redirect } = rest;
    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { invalid, ...rest }));

    return (
        <Toolbar {...rest} className={classNames('px-3 py-1 d-flex flex-row-reverse mt-0', className)}>
            {!hideSaveButton && (
                <MySaveButton
                    redirect={redirect}
                    {...rest}
                    callback={callback}
                    beforeSubmit={beforeSubmit}
                    convertValue={convertValue}
                    action={customAction}
                    hideNotification={hideNotification}
                    customNotification={customNotification}
                />
            )}
            {childrenWithProps}
            {customButton}
        </Toolbar>
    );
};
MySaveToolbar.propTypes = {
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    customAction: PropTypes.func,
    beforeSubmit: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    customButton: PropTypes.any,
    hideSaveButton: PropTypes.bool
};

MySaveButton.defaultValues = {
    hideSaveButton: false
};

export default MySaveToolbar;
