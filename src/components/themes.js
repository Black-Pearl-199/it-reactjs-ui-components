import { createMuiTheme } from '@material-ui/core';

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

export const vietradThemeLight = createMuiTheme({
    palette: {
        primary: {
            mainColor: 'rgb(221, 221, 221)',
            main: '#b7b7b6', // palette mus have 'main' atribute
            mainColorLight: '#D6D6D6',
            mainColorDark: 'rgb(153, 153, 153)',
            mainColorHover: 'rgb(153, 153, 153)',
            mainColorLight1: 'rgb(221, 221, 221)',
            buttonColorPrimary: 'rgb(153, 153, 153)',
            buttonColorSecondary: '#cccccc',
            contentBackground: '#F7F7F7',
            mainBackground: 'rgb(221, 221, 221)',
            // mainBackground: '#ff91e0',
            sidebarBackground: 'rgb(221, 221, 221)',
            navbarBackground: 'rgb(221, 221, 221)',
            formBackgroundColor: '#e8eaed',
            formBackgroundColorFocus: '#fefefe',
            formBackgroundColorDisabled: '#b7b7b6',
            defaultText: '#FFFFFF',
            textColor: '#2E3E47',
            textColorAlternate: '#2E3E47',
            textColorButton: getContrastColor('rgb(153, 153, 153)'),
            textColorLight: '#495057',
            textColorLink: '#0056b3',
            textColorDone: '#006600',
            textColorUnread: '#0056b3',
            textHighlightColor: '#e8eaed',
            tableOdd: '#F7F7F7', // light grey
            tableEven: 'rgb(238, 238, 238)', // light grey
            modalItechBackground: '#F7F9FC',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: 'rgb(124, 124, 124)',
            hospitalTitle: '#404040',
            infoTitle: '#748189',
            reportBackgroundColor: '#FFFFFF',
            // shadow: '0 1px 5px 0 rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12)',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#b7b7b6',
            tabHeight: '32px',
            greyBackground: 'rgb(201, 201, 201)'
            // topHeight: '100px'
            // contrastText: 'rgb(255,192,203)'
        },
        // text: {
        //     default: '#FFFFFF',
        //     main: '#2E3E47'
        // },
        type: 'light'
    }
});

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
            textColorLink: '#5c96d6',
            textColorDone: '#C8E7D2',
            // textColorUnread: '#3589e6',
            textColorUnread: '#FFD600',
            textHighlightColor: '#666666',
            tableOdd: '#363535 ', // light grey
            tableEven: '#3c3b3b', // light grey
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
