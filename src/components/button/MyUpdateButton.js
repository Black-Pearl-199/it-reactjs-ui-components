import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { ITCrudUpdate, showEnhanceNotification } from '../../configurations';
import { buttonGreenStyles } from '../MyCustomStyles';
import SaveButton from './SaveButton';

const useStyles = makeStyles(buttonGreenStyles);

const MyUpdateButton = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const dispatch = useDispatch();
    const {
        beforeSubmit,
        basePath,
        resource,
        callback,
        convertValue,
        action = ITCrudUpdate,
        hideNotification,
        customNotification = {},
        label,
        labelConfirm,
        filter,
        editing,
        changeEditState,
        buttonClasses,
        ...rest
    } = props;

    const handleSave = useCallback(
        (values, redirect) => {
            if (!editing && changeEditState) {
                changeEditState(true);
                return;
            }
            const resourceName = translate(`resources.${resource}.name`);
            const { message = 'commons.message.edit', type = 'info', messageArgs = {} } = customNotification;
            const sendRequest = (values) => {
                const data = convertValue ? convertValue(values) : values;
                const meta = hideNotification
                    ? {
                        onSuccess: {
                            redirectTo: redirect,
                            basePath,
                            callback
                        }
                    }
                    : {};
                dispatch(
                    action({
                        filter,
                        resource,
                        data,
                        basePath,
                        redirectTo: redirect,
                        resourceName,
                        callback,
                        id: data.id,
                        meta
                    })
                );
            };
            if (beforeSubmit) {
                beforeSubmit(values).then((result) => {
                    if (result) {
                        dispatch(
                            showEnhanceNotification(message, type, {
                                messageArgs: { resourceName, ...messageArgs },
                                actions: [
                                    {
                                        label: labelConfirm || 'button.add',
                                        callback: () => {
                                            sendRequest(values);
                                        }
                                    }
                                ]
                            })
                        );
                    }
                });
            } else {
                dispatch(
                    showEnhanceNotification(message, type, {
                        messageArgs: { resourceName, ...messageArgs },
                        actions: [
                            {
                                label: labelConfirm || 'button.add',
                                callback: () => {
                                    sendRequest(values);
                                }
                            }
                        ]
                    })
                );
            }
        },
        [
            action,
            basePath,
            beforeSubmit,
            callback,
            changeEditState,
            convertValue,
            customNotification,
            dispatch,
            editing,
            filter,
            hideNotification,
            resource,
            translate,
            labelConfirm
        ]
    );

    // override handleSubmitWithRedirect with custom logic
    return <SaveButton {...rest} classes={classes} onSave={handleSave} label={label || 'button.change'} className={buttonClasses} />;
};

MyUpdateButton.propTypes = {
    beforeSubmit: PropTypes.func,
    callback: PropTypes.func,
    convertValue: PropTypes.func,
    action: PropTypes.func,
    hideNotification: PropTypes.bool,
    customNotification: PropTypes.object,
    dispatch: PropTypes.func,
    basePath: PropTypes.string,
    resource: PropTypes.string,
    label: PropTypes.string,
    filter: PropTypes.object,
    editing: PropTypes.bool,
    changeEditState: PropTypes.func,
    buttonClasses: PropTypes.string,
    labelConfirm: PropTypes.string
};

export default MyUpdateButton;
