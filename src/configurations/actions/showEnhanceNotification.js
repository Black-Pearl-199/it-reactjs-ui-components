import { SHOW_NOTIFICATION } from 'react-admin';

/**
 *  @param message {String} : message for show
 *  @param type {String} : type of message box include "info", "warning", or "action"
 *  @param notificationOptions {{autoHideDuration: string, messageArgs: object, undoable: boolean, actions: array}}
 */
const showEnhanceNotification = (message, type = 'info', notificationOptions) => ({
    type: SHOW_NOTIFICATION,
    payload: {
        ...notificationOptions,
        type,
        message
    }
});

export default showEnhanceNotification;
