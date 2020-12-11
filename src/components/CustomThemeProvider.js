import { MuiThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { getContrastColor } from './themes';

const camelCaseToCss = (input) => input.split(/(?=[A-Z, 0-9])/).join('-').toLowerCase();

const CustomThemeProvider = (props) => {
    const { theme } = props;
    const root = document.documentElement;
    // console.log('Theme', theme);
    // eslint-disable-next-line guard-for-in
    useEffect(() => {
        for (const [key, value] of Object.entries(theme.palette.primary)) {
            // console.log('theme color', key, value);
            if (value) {
                root.style.setProperty(`--${camelCaseToCss(key)}`, value);
                root.style.setProperty(`--${camelCaseToCss(key)}-contrast`, getContrastColor(value));
            }
        }
    }, [theme.palette, theme.palette.type, root.style]);

    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

CustomThemeProvider.propTypes = {
    theme: PropTypes.object
};

export default CustomThemeProvider;
