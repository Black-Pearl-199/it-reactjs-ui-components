import { array, string, bool } from 'prop-types';
import React, { useCallback } from 'react';
import { useSetLocale, useTranslate } from 'react-admin';
import { useTheme } from '@material-ui/core';
import { Dropdown, Tooltip, OverlayTrigger, DropdownButton } from 'react-bootstrap';

import { LOCALE_EN, LOCALE_VI } from '../configurations/messages';

const ThemeSwitcher = (props) => {
    const theme = useTheme();
    const root = document.documentElement;
    root.style.setProperty('--main-color-dark', theme.palette.primary.dark);
    root.style.setProperty('--main-color-hover', theme.palette.primary.light);
    root.style.setProperty('--main-color', theme.palette.primary.main);
    console.log('ThemeSwitcher theme', theme);
    return null;
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
};

ThemeSwitcher.defaultProps = {
    // buttons: [
    //     { eventKey: LOCALE_EN, text: 'English' },
    //     { eventKey: LOCALE_VI, text: 'Tiếng Việt' }
    // ],
    // localStorageKey: 'saveLocale'
};

export default ThemeSwitcher;
