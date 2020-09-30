import { array, string, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { useSetLocale, useTranslate } from 'react-admin';
import { useTheme } from '@material-ui/core';
import { Dropdown, Tooltip, OverlayTrigger, DropdownButton } from 'react-bootstrap';

import { LOCALE_EN, LOCALE_VI } from '../configurations/messages';

// const COLOR_MAPPING = {
//     '--form-background-color': 'formBgColor',
//     '--form-background-color-focus': 'formBgColorFocus',
//     '--default-text': 'defaultText',
//     '--text-color': 'textColor',
//     '--text-color-light': 'textColorLight',
//     '--modal-itech-background': 'modalItechBackground',
//     '--main-color-opacity': 'mainColorOpacity',
//     '--main-color': 'main',
//     '--main-color-hover': 'mainColorHover',
//     '--main-color-light': 'light',
//     '--main-color-light-1': 'mainColorLight1',
//     '--main-color-dark': 'dark'
// };
const camelCaseToCss = (input) => input.split(/(?=[A-Z, 0-9])/).join('-').toLowerCase();

const ThemeSwitcher = (props) => {
    const theme = useTheme();
    const translate = useTranslate();
    const { onClick } = props;
    const isDark = theme.palette.type === 'dark';
    const root = document.documentElement;
    // console.log('Theme', theme);
    // eslint-disable-next-line guard-for-in
    useEffect(() => {
        for (const [key, value] of Object.entries(theme.palette.primary)) {
            // console.log('theme color', key, value);
            if (value) root.style.setProperty(`--${camelCaseToCss(key)}`, value);
        }
    }, [theme.palette, theme.palette.type, root.style]);


    return (
        isDark
            ? (
                <OverlayTrigger
                    placement="bottom"
                    overlay={(
                        <Tooltip className="itech-tooltip" id="logout-button">
                            {translate('commons.theme.toLight')}
                        </Tooltip>
                    )}
                >
                    <span
                    // variant="itech-icon"
                    // size="sm"
                        className="btn btn-itech-icon btn-itech-icon-secondary my-auto"
                        onClick={onClick}
                    >
                        {/* {translate('button.logout')} */}
                        <i className="fa fa-sun" />
                    </span>
                </OverlayTrigger>
            )
            : (
                <OverlayTrigger
                    placement="bottom"
                    overlay={(
                        <Tooltip className="itech-tooltip" id="logout-button">
                            {translate('commons.theme.toDark')}
                        </Tooltip>
                    )}
                >
                    <span
                        // variant="itech-icon"
                        // size="sm"
                        className="btn btn-itech-icon btn-itech-icon-secondary my-auto"
                        onClick={onClick}
                    >
                        {/* {translate('button.logout')} */}
                        <i className="fa fa-moon" />
                    </span>
                </OverlayTrigger>
            )
    );
    // return (
        // <div onClick={fixPropagationEvent} className="my-auto">
        //     <DropdownButton
        //         alignRight
        //         title={title}
        //         id={id}
        //         variant={variant}
        //         size={size}
        //         onSelect={onSelectLanguage}
        //         {...rest}
        //     >
        //         {buttons.map((button) => (
        //             <Dropdown.Item
        //                 as="button"
        //                 eventKey={button.eventKey}
        //                 className="font-1rem"
        //                 key={button.eventKey}
        //             >
        //                 {button.text}
        //             </Dropdown.Item>
        //         ))}
        //     </DropdownButton>
        // </div>
    // );
};

ThemeSwitcher.propTypes = {
    onClick: func
};

ThemeSwitcher.defaultProps = {
    // buttons: [
    //     { eventKey: LOCALE_EN, text: 'English' },
    //     { eventKey: LOCALE_VI, text: 'Tiếng Việt' }
    // ],
    // localStorageKey: 'saveLocale'
};

export default ThemeSwitcher;
