import React from 'react';
import { Toolbar } from 'react-admin';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { MySaveButton } from './MySaveButton';

export const MySaveToolbar = (props) => {
    const { children, callback, className, beforeSubmit, convertValue, customAction, hideNotification, customNotification, form, ...rest } = props;
    const { invalid, redirect } = rest;
    console.log('mysavetoolbar', props.form);
    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { invalid, ...rest }));

    return (
        <Toolbar {...rest} className={classNames('px-3 py-1 d-flex flex-row-reverse mt-0', className)}>
            <MySaveButton
                redirect={redirect}
                {...rest}
                callback={callback}
                beforeSubmit={beforeSubmit}
                convertValue={convertValue}
                action={customAction}
                hideNotification={hideNotification}
                customNotification={customNotification}
                form={form}
            />
            {childrenWithProps}
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
    form: PropTypes.string
};
