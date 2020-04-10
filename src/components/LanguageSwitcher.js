import React, { useCallback } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { string, array } from 'prop-types';
import { useSetLocale, useTranslate } from 'react-admin';

import { LOCALE_EN, LOCALE_VI } from '../configurations/messages';

export const LanguageSwitcher = (props) => {
    const {
        locale,
        id,
        variant,
        size,
        buttons,
        ...rest
    } = props;
    const translate = useTranslate();
    const setLocale = useSetLocale();

    const onSelectLanguage = useCallback(
        (languageKey, event) => {
            event.preventDefault();
            event.stopPropagation();
            setLocale(languageKey);
            localStorage.setItem('saveLocale', languageKey);
        },
        [setLocale]
    );

    const fixPropagationEvent = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
        },
        []
    );

    return (
        <div onClick={fixPropagationEvent} className="my-auto">
            <DropdownButton
                alignRight
                title={translate('language.name')}
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
                        className="font-875rem"
                        key={button.eventKey}
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
    variant: string
};

LanguageSwitcher.defaultProps = {
    buttons: [
        { eventKey: LOCALE_EN, text: 'English' },
        { eventKey: LOCALE_VI, text: 'Tiếng Việt' }
    ]
};
