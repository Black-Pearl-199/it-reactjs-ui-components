import { createMuiTheme } from '@material-ui/core';
import { viettelLogo, iTechLogoLight, iTechLogoDark, iTechLogoIcon } from './logoString';
import { ipacsDark, ipacsLight, hospitalDark } from './logoIpacsString';

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
            formBackgroundColor: '#FFFFFF',
            formBackgroundColorFocus: '#cccccc',
            formBackgroundColorDisabled: '#f7f9fa',
            defaultText: '#FFFFFF',
            textColor: '#58585a',
            textColorAlternate: '#58585a',
            textColorButton: getContrastColor('rgb(153, 153, 153)'),
            textColorLight: '#495057',
            textColorLink: '#626AAB',
            textColorDone: '#079a48',
            textColorUnread: '#C64C54',
            textHighlightColor: '#cccccc',
            tableOdd: '#f7f9fa', // light grey
            tableEven: '#ffffff', // light grey
            modalItechBackground: '#f7f9fa',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: '#079a48',
            hospitalTitle: '#8ec540',
            infoTitle: '#748189',
            reportBackgroundColor: '#f7f9fa',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#b7b7b6',
            tabHeight: '45px',
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
        },
        logoIpacs: {
            type: 'svg',
            src: ipacsLight
        },
        logoHospital: {
            type: 'svg',
            src: ipacsLight
        }
    }
});

export const iTechThemeDark = createMuiTheme({
    palette: {
        primary: {
            mainColor: '#8ec540',
            main: '#8ec540', // palette mus have 'main' atribute
            mainColorLight: '#8ec540',
            mainColorDark: '#079a48',
            mainColorHover: '#079a48',
            buttonColorPrimary: '#079a48',
            buttonColorSecondary: '#8ec540',
            contentBackground: '#000000',
            mainBackground: '#000000',
            // mainBackground: '#ff91e0',
            sidebarBackground: '#2a2c2f',
            sidebarHeaderBackground: '#2a2c2f',
            formBackgroundColor: '#000000',
            formBackgroundColorFocus: '#cccccc',
            formBackgroundColorDisabled: '#58585a',
            defaultText: '#f7f9fa',
            textColor: '#f7f9fa',
            textColorAlternate: '#f7f9fa',
            textColorButton: getContrastColor('rgb(153, 153, 153)'),
            textColorLight: '#495057',
            textColorLink: '#626AAB',
            textColorDone: '#079a48',
            textColorUnread: '#C64C54',
            textHighlightColor: '#cccccc',
            tableOdd: '#2a2c2f', // light grey
            tableEven: '#000000', // light grey
            modalItechBackground: '#2a2c2f',
            mainColorOpacity: 'rgba(55, 107, 81, 0.1)',
            styledTitle: '#079a48',
            hospitalTitle: '#8ec540',
            infoTitle: '#748189',
            reportBackgroundColor: '#2a2c2f',
            shadow: 'rgb(0, 0, 0, 0)',
            borderColor: '#2a2c2f',
            tabHeight: '45px',
            greyBackground: 'rgb(201, 201, 201)'
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
        },
        logoIpacs: {
            type: 'svg',
            src: ipacsDark
        },
        logoHospital: {
            type: 'svg',
            src: hospitalDark
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
