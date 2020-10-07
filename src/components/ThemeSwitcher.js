import { array, string, bool, func } from 'prop-types';
import React, { useEffect, useCallback } from 'react';
import { useSetLocale, useTranslate } from 'react-admin';
import { useTheme } from '@material-ui/core';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '../configurations/actions';

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
const themeSelector = (state) => state.themeType;

const ThemeSwitcher = (props) => {
    const theme = useTheme();
    const themeType = useSelector(themeSelector);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { handleSwitchTheme, canSwitch } = props;
    const isDark = theme.palette.type === 'dark';

    // console.log('ThemeController current theme', themeType);
    useEffect(() => {
        if (canSwitch) handleSwitchTheme(themeType);
    }, [canSwitch, handleSwitchTheme, themeType]);

    const handleClick = useCallback(() => {
        // console.log('handleClick themeSwitcher');
        // console.log('handleClick themeSwitcher', switchTheme(theme.palette.type));
        dispatch(switchTheme(theme.palette.type));
    }, [dispatch, theme.palette.type]);

    return (
        canSwitch
            ? (
                <OverlayTrigger
                    placement="bottom"
                    overlay={(
                        <Tooltip className="itech-tooltip" id={isDark ? 'toLight-button' : 'toDark-button'}>
                            {translate(isDark ? 'commons.theme.toLight' : 'commons.theme.toDark')}
                        </Tooltip>
                    )}
                >
                    <span
                    // variant="itech-icon"
                    // size="sm"
                        className="btn btn-itech-icon btn-itech-icon-secondary my-auto"
                        onClick={handleClick}
                    >
                        {/* {translate('button.logout')} */}
                        <i className={isDark ? 'fa fa-sun' : 'fa fa-moon'} />
                    </span>
                </OverlayTrigger>
            )
            : ''
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
    onClick: func,
    canSwitch: bool,
    handleSwitchTheme: func
};

ThemeSwitcher.defaultProps = {
    canSwitch: true
};

export default ThemeSwitcher;
