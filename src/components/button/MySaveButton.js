import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { ITCrudCreate, showEnhanceNotification } from '../../configurations/actions';
import { buttonGreenStyles } from '../MyCustomStyles';
import SaveButton from './SaveButton';

const useStyles = makeStyles(buttonGreenStyles);

const MySaveButton = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const dispatch = useDispatch();
    const {
        beforeSubmit,
        basePath,
        resource,
        callback,
        convertValue,
        action = ITCrudCreate,
        hideNotification,
        customNotification = {},
        label,
        filter,
        buttonClasses,
        ...rest
    } = props;

    const handleSave = useCallback(
        (values, redirect) => {
            const resourceName = translate(`resources.${resource}.name`);
            const { message = 'commons.message.save', type = 'info', messageArgs = {} } = customNotification;

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
            convertValue,
            customNotification,
            dispatch,
            filter,
            hideNotification,
            label,
            resource,
            translate
        ]
    );

    // override handleSubmitWithRedirect with custom logic
    return <SaveButton {...rest} classes={classes} onSave={handleSave} label={label} className={buttonClasses} />;
};

MySaveButton.propTypes = {
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
    buttonClasses: PropTypes.string
};

export default MySaveButton;
