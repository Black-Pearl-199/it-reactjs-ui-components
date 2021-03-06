import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Toolbar } from 'react-admin';

import MyDeleteButton from './MyDeleteButton';
import MyUpdateButton from './MyUpdateButton';
import RevertEditButton from './RevertEditButton';

const fixToolbarHeight = {
    minHeight: 'unset'
};

const MyEditToolbar = (props) => {
    const {
        children,
        invalid,
        callback,
        className,
        hideEditButton,
        editing,
        deletable,
        optimistic,
        customButton,
        changeEditState,
        convertValue,
        customAction,
        undoable,
        beforeSubmit,
        hideNotification,
        customNotification,
        filter,
        buttonClasses,
        labelConfirm,
        ...rest
    } = props;
    const { redirect } = rest;

    const { record, resource, basePath } = rest;
    const { id } = record;
    // console.log('update toolbar props', props);
    const childrenWithProps = React.Children.map(children, (child) => !!child && React.cloneElement(child, { invalid, ...rest }));

    return (
        <Toolbar {...rest} className={classNames('px-3 mt-2 mb-1 py-0 d-flex', className)} style={fixToolbarHeight}>
            {!hideEditButton && (
                <MyUpdateButton
                    redirect={redirect}
                    undoable={undoable}
                    beforeSubmit={beforeSubmit}
                    editing={editing}
                    convertValue={convertValue}
                    action={customAction}
                    changeEditState={changeEditState}
                    callback={callback}
                    customNotification={customNotification}
                    filter={filter}
                    buttonClasses={buttonClasses}
                    labelConfirm={labelConfirm}
                    {...rest}
                />
            )}
            {childrenWithProps}
            {customButton}
            {editing ? <RevertEditButton {...rest} changeEditState={changeEditState} /> : null}
            {deletable ? (
                <MyDeleteButton
                    id={id}
                    basePath={basePath}
                    record={record}
                    resource={resource}
                    optimistic={optimistic}
                    callback={callback}
                />
            ) : null}
        </Toolbar>
    );
};
MyEditToolbar.propTypes = {
    deletable: PropTypes.bool,
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    customAction: PropTypes.func,
    beforeSubmit: PropTypes.func,
    editing: PropTypes.bool,
    changeEditState: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    filter: PropTypes.object,
    invalid: PropTypes.bool,
    optimistic: PropTypes.bool,
    customButton: PropTypes.element,
    undoable: PropTypes.bool,
    hideEditButton: PropTypes.bool,
    buttonClasses: PropTypes.string,
    labelConfirm: PropTypes.string
};

MyEditToolbar.defaultValues = {
    hideEditButton: false
};

export default MyEditToolbar;
