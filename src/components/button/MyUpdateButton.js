import { makeStyles } from '@material-ui/core/styles';
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
        filter,
        editing,
        changeEditState,
        ...rest
    } = props;

    const handleSave = useCallback(
        (values, redirect) => {
            const resourceName = translate(`resources.${resource}.name`);
            const { message = 'commons.message.edit', type = 'actions', messageArgs = {} } = customNotification;
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
            if (!editing && changeEditState) {
                changeEditState(true);
            } else if (beforeSubmit) {
                beforeSubmit(values).then((result) => {
                    if (result) {
                        dispatch(
                            showEnhanceNotification(message, type, {
                                messageArgs: { resourceName, ...messageArgs },
                                actions: [
                                    {
                                        label: label || 'button.add',
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
                                label: label || 'button.add',
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
            label,
            resource,
            translate
        ]
    );

    // override handleSubmitWithRedirect with custom logic
    return <SaveButton {...rest} classes={classes} onSave={handleSave} label="button.edit" />;
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
    changeEditState: PropTypes.func
};

export default MyUpdateButton;
