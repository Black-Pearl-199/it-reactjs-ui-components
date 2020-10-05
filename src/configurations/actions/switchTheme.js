export const SWITCH_THEME = 'IT/SWITCH_THEME';
/**
 *  @param message {String} : message for show
 *  @param type {String} : type of message box include "info", "warning", or "action"
 *  @param notificationOptions {{autoHideDuration: string, messageArgs: object, undoable: boolean, actions: array}}
 */
const switchTheme = (themeType = 'light') => ({
    type: SWITCH_THEME,
    payload: {
        themeType
    }
});

export default switchTheme;
