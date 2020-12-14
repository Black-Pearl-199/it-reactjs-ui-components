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
export const getContrastColor = (inputColor) => {
    // return a well contrasted color based on inputColor
    const convertedRGB = [];
    if (inputColor.startsWith('#')) {
        convertedRGB.push(parseInt(inputColor.substr(1, 2), 16)); // red
        convertedRGB.push(parseInt(inputColor.substr(3, 2), 16)); // green
        convertedRGB.push(parseInt(inputColor.substr(5, 2), 16)); // blue
    } else if (inputColor.startsWith('rgb')) {
        const firstIndex = inputColor.indexOf('(');
        const colorStr = inputColor.substr(firstIndex + 1, inputColor.length - firstIndex - 1);
        const rgb = colorStr.split(',').map((color) => parseInt(color));
        convertedRGB.push(...rgb);
    }
    // http://www.w3.org/TR/AERT#color-contrast
    const brightness = Math.round(((convertedRGB[0] * 299) +
                                    (convertedRGB[1] * 587) +
                                    (convertedRGB[2] * 114)) / 1000);
    const contrastColor = brightness > 125 ? 'black' : '#E0E0E0';
    return contrastColor;
};

export const iTechThemeLight = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#376B51',
            main: '#376B51', // palette mus have 'main' atribute
            mainColorLight: '#76B194',
            mainColorDark: '#3e935a',
            mainColorHover: '#2C5641',
            buttonColorPrimary: '#666666',
            buttonColorSecondary: '#cccccc',
            contentBackground: '#F7F7F7',
            mainBackground: '#F7F7F7',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#FFFFFF',
            navbarBackground: '#FFFFFF',
            formBackgroundColor: '#FFFFFF',
            formBackgroundColorFocus: 'rgba(33, 156, 119, 0.2)',
            formBackgroundColorDisabled: '#e9ecef',
            defaultText: '#FFFFFF',
            textColor: '#2E3E47',
            textColorButton: getContrastColor('#666666'),
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
            mainColor: '#cccccc',
            main: '#c7663f', // use this color for checkboxes, radio button background
            mainColorLight: '#dddddd',
            mainColorDark: '#666666',
            mainColorHover: '#5E5E5E',
            buttonColorPrimary: '#cccccc',
            buttonColorSecondary: '#666666',
            contentBackground: '#dddddd',
            mainBackground: '#333333',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#333333',
            navbarBackground: '#333333',
            formBackgroundColor: '#cccccc',
            formBackgroundColorFocus: '#5E5E5E',
            formBackgroundColorDisabled: '#666666',
            defaultText: '#FFFFFF',
            textColor: '#E0E0E0',
            textColorLight: '#495057',
            textColorLink: '#8cc3ff',
            textColorDone: '#C8E7D2',
            textHighlightColor: '#666666',
            tableOdd: '#6e6e6e', // light grey
            tableEven: '#585858', // light grey
            modalItechBackground: '#999999',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: '#cccccc',
            hospitalTitle: '#FFFFFF',
            infoTitle: '#FFFFFF',
            reportBackgroundColor: '#cccccc',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#555555'
            // contrastText: 'rgb(255,192,203)'
        },
        // text: {
        //     default: '#FFFFFF',
        //     main: '#2E3E47'
        // },
        type: 'dark'
    }
});
