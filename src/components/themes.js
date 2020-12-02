import { createMuiTheme } from '@material-ui/core';

/*
$form-background-color: rgba(33, 156, 119, 0.1);
$form-background-color-focus:rgba(33, 156, 119, 0.2);
$default-text: #ffffff;
$default-text-selected: #ffffff;
$text-color: #2E3E47;
$text-color-light: #495057;
$modal-itech-background:  #F7F9FC;
$main-color-opacity: rgba(55, 107, 81, 0.1);
$main-color: #376B51;
$main-color-hover: #2C5641;
$main-color-light: #6c7770;
$main-color-light-1: #C8E7D2;
$main-color-dark: #4c4c4c;

const COLOR_MAPPING = {
    '--form-background-color': 'formBgColor',
    '--form-background-color-focus': 'formBgColorFocus',
    '--default-text': 'defaultText',
    '--text-color': 'textColor',
    '--text-color-light': 'textColorLight',
    '--modal-itech-background': 'modalItechBackground',
    '--main-color-opacity': 'mainColorOpacity',
    '--main-color': 'main',
    '--main-color-hover': 'mainColorHover',
    '--main-color-light': 'light',
    '--main-color-light-1': 'mainColorLight1',
    '--main-color-dark': 'dark'
};
*/

export const iTechThemeLight = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#376B51',
            main: '#376B51', // palette mus have 'main' atribute
            mainColorLight: '#76B194',
            mainColorDark: '#3e935a',
            mainColorHover: '#2C5641',
            mainColorLight1: '#C8E7D2',
            mainBackground: '#F7F7F7',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#FFFFFF',
            navbarBackground: '#FFFFFF',
            formBackgroundColor: '#FFFFFF',
            formBackgroundColorFocus: 'rgba(33, 156, 119, 0.2)',
            formBackgroundColorDisabled: '#e9ecef',
            defaultText: '#FFFFFF',
            textColor: '#2E3E47',
            textColorLight: '#495057',
            textColorLink: '#0056b3',
            textColorDone: '#006600',
            textHighlightColor: '#cccccc',
            tableOdd: '#F7F7F7', // light grey
            tableEven: '#EBF1EE', // light grey
            modalItechBackground: '#F7F9FC',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: 'rgb(62, 147, 90)',
            hospitalTitle: '#2b9d41',
            infoTitle: '#748189',
            reportBackgroundColor: '#FFFFFF',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#2E3E47'
            // contrastText: 'rgb(255,192,203)'
        },
        // text: {
        //     default: '#FFFFFF',
        //     main: '#2E3E47'
        // },
        type: 'light'
    }
});

export const iTechThemeDark = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#121212',
            main: '#c7663f', // use this color for checkboxes, radio button background
            mainColorLight: '#5EB88B',
            mainColorDark: '#303030',
            mainColorHover: '#5E5E5E',
            mainColorLight1: '#7EF7BB',
            mainBackground: '#18191a',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#18191a',
            navbarBackground: '#242526',
            formBackgroundColor: '#242424',
            formBackgroundColorFocus: '#5E5E5E',
            formBackgroundColorDisabled: '#121212',
            defaultText: '#FFFFFF',
            textColor: '#E0E0E0',
            textColorLight: '#495057',
            textColorLink: '#8cc3ff',
            textColorDone: '#C8E7D2',
            textHighlightColor: '#333333',
            tableOdd: '#242424', // light grey
            tableEven: '#333333', // light grey
            modalItechBackground: '#F7F9FC',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: '#cccccc',
            hospitalTitle: '#FFFFFF',
            infoTitle: '#FFFFFF',
            reportBackgroundColor: '#cccccc',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#5E5E5E'
            // contrastText: 'rgb(255,192,203)'
        },
        // text: {
        //     default: '#FFFFFF',
        //     main: '#2E3E47'
        // },
        type: 'dark'
    }
});
