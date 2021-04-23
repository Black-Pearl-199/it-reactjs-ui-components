import { createMuiTheme } from '@material-ui/core';
import { viettelLogo, iTechLogoLight, iTechLogoDark, iTechLogoIcon } from './logoString';

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
    const brightness = Math.round(((convertedRGB[0] * 299)
                                    + (convertedRGB[1] * 587)
                                    + (convertedRGB[2] * 114)) / 1000);
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
            buttonColorPrimary: 'rgb(153, 153, 153)',
            buttonColorSecondary: '#cccccc',
            contentBackground: '#F7F7F7',
            mainBackground: 'rgb(221, 221, 221)',
            // mainBackground: '#ff91e0',
            sidebarBackground: 'rgb(221, 221, 221)',
            sidebarHeaderBackground: 'rgb(221, 221, 221)',
            navTabBackground: 'rgb(153, 153, 153)',
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
            textHighlightColor: '#cccccc',
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
    },
    logo: {
        navbar: {
            type: 'svg',
            src: viettelLogo
        },
        login: {
            type: 'svg',
            src: viettelLogo
        },
        waitingOrder: {
            type: 'svg',
            src: viettelLogo
        },
        icon: {
            type: 'svg',
            src: viettelLogo
        }
    }
});

export const iTechThemeLight = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#8ec540',
            main: '#8ec540', // palette mus have 'main' atribute
            mainColorLight: '#8ec540',
            mainColorDark: '#079a48',
            mainColorHover: '#079a48',
            buttonColorPrimary: '#079a48',
            buttonColorSecondary: '#8ec540',
            contentBackground: '#ffffff',
            mainBackground: '#ffffff',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#f7f9fa',
            sidebarHeaderBackground: '#f7f9fa',
            formBackgroundColor: 'rgb(209, 224, 216)',
            formBackgroundColorFocus: '#cccccc',
            formBackgroundColorDisabled: '#b7b7b6',
            defaultText: '#FFFFFF',
            textColor: '#2E3E47',
            textColorAlternate: '#2E3E47',
            textColorButton: getContrastColor('rgb(153, 153, 153)'),
            textColorLight: '#495057',
            textColorLink: '#0056b3',
            textColorDone: '#006600',
            textColorUnread: '#0056b3',
            textHighlightColor: '#cccccc',
            tableOdd: '#f7f9fa', // light grey
            tableEven: '#ffffff', // light grey
            modalItechBackground: '#f7f9fa',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: '#8ec540',
            hospitalTitle: '#8ec540',
            infoTitle: '#748189',
            reportBackgroundColor: '#FFFFFF',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#b7b7b6',
            tabHeight: '60px',
            greyBackground: 'rgb(201, 201, 201)'
        },
        // text: {
        //     default: '#FFFFFF',
        //     main: '#2E3E47'
        // },
        type: 'light'
    },
    logo: {
        navbar: {
            type: 'svg',
            src: iTechLogoLight
        },
        login: {
            type: 'svg',
            src: iTechLogoLight
        },
        waitingOrder: {
            type: 'svg',
            src: iTechLogoLight
        },
        icon: {
            type: 'svg',
            src: iTechLogoIcon
        }
    }
});

export const iTechThemeDark = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#cccccc',
            main: '#c7663f', // use this color for checkboxes, radio button background
            mainColorLight: '#dddddd',
            mainColorDark: '#2A2B2C',
            mainColorHover: '#5E5E5E',
            buttonColorPrimary: '#cccccc',
            buttonColorSecondary: '#666666',
            contentBackground: '#dddddd',
            mainBackground: '#3c3d3e',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#3c3d3e',
            sidebarHeaderBackground: '#3c3d3e',
            navTabBackground: '#2A2B2C',
            navbarBackground: '#3c3d3e',
            formBackgroundColor: '#cccccc',
            formBackgroundColorFocus: '#5E5E5E',
            formBackgroundColorDisabled: '#666666',
            defaultText: '#FFFFFF',
            textColor: '#E0E0E0',
            textColorLight: '#495057',
            textColorLink: '#1db6ff',
            textColorDone: '#C8E7D2',
            // textColorUnread: '#3589e6',
            textColorUnread: '#FFD600',
            textHighlightColor: '#666666',
            tableOdd: '#1e1e1e ', // light grey
            tableEven: '#2a2b2c', // light grey
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
    },
    logo: {
        navbar: {
            type: 'svg',
            src: iTechLogoDark
        },
        login: {
            type: 'svg',
            src: iTechLogoDark
        },
        waitingOrder: {
            type: 'svg',
            src: iTechLogoLight
        },
        icon: {
            type: 'svg',
            src: iTechLogoIcon
        }
    }
});

export const vietradThemeDark = createMuiTheme({
    ...iTechThemeDark,
    logo: {
        navbar: {
            type: 'svg',
            src: viettelLogo
        },
        login: {
            type: 'svg',
            src: viettelLogo
        },
        waitingOrder: {
            type: 'svg',
            src: viettelLogo
        },
        icon: {
            type: 'svg',
            src: viettelLogo
        }
    }
});
