import { array, string, bool } from 'prop-types';
import React, { useCallback } from 'react';
import { useSetLocale, useTranslate } from 'react-admin';
import { Dropdown, Tooltip, OverlayTrigger, DropdownButton } from 'react-bootstrap';

import { LOCALE_EN, LOCALE_VI } from '../configurations/messages';

const LanguageSwitcher = (props) => {
    const {
        locale,
        id,
        variant,
        size,
        buttons,
        localStorageKey,
        hasIcon,
        ...rest
    } = props;
    const translate = useTranslate();
    const currentLanguage = localStorage.getItem(localStorageKey);
    const setLocale = useSetLocale(currentLanguage);

    const onSelectLanguage = useCallback(
        (languageKey, event) => {
            event.preventDefault();
            event.stopPropagation();
            setLocale(languageKey);
            localStorage.setItem(localStorageKey, languageKey);
        },
        [localStorageKey, setLocale]
    );

    const fixPropagationEvent = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, []
    );
    const title = hasIcon ? (
        <OverlayTrigger
            placement="bottom"
            overlay={(
                <Tooltip className="itech-tooltip" id="button-language">
                    {translate('language.name')}
                </Tooltip>
            )}
        >
            <span
                className="btn btn-itech-icon btn-itech-icon-secondary button-main-color font-20px"
            >
                <i className="fa fa-globe-asia" />
            </span>
        </OverlayTrigger>
    ) : translate('language.name');

    return (
        <div onClick={fixPropagationEvent} className="my-auto">
            <DropdownButton
                alignRight
                title={title}
                id={id}
                variant={variant}
                size={size}
                onSelect={onSelectLanguage}
                {...rest}
            >
                {buttons.map((button) => (
                    <Dropdown.Item
                        as="button"
                        eventKey={button.eventKey}
                        className="font-1rem"
                        key={button.eventKey}
                        style={{ zIndex: '3' }}
                    >
                        {button.text}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
};

LanguageSwitcher.propTypes = {
    buttons: array,
    locale: string,
    id: string,
    size: string,
    variant: string,
    localStorageKey: string,
    hasIcon: bool
};

LanguageSwitcher.defaultProps = {
    buttons: [
        { eventKey: LOCALE_EN, text: 'English' },
        { eventKey: LOCALE_VI, text: 'Tiếng Việt' }
    ],
    localStorageKey: 'saveLocale'
};

export default LanguageSwitcher;
