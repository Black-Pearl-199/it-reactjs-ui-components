import { SHOW_NOTIFICATION } from 'ra-core';

/**
 *  @param message {String} : message for show
 *  @param type {String} : type of message box include "info", "warning", or "action"
 *  @param notificationOptions {{autoHideDuration: string, messageArgs: object, undoable: boolean, actions: array}}
 */
export const showEnhanceNotification = (message, type = 'info', notificationOptions) => ({
    type: SHOW_NOTIFICATION,
    payload: {
        ...notificationOptions,
        type,
        message
    }
});
