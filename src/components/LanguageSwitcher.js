import React, { useCallback } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { string } from 'prop-types';
import { useSetLocale, useTranslate } from 'react-admin';

import { LOCALE_EN, LOCALE_VI } from '../configurations/messages';

export const LanguageSwitcher = (props) => {
    const {
        locale,
        id,
        variant,
        size,
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
                <Dropdown.Item
                    as="button"
                    eventKey={LOCALE_EN}
                    className="font-875rem"
                >
                    English
                </Dropdown.Item>
                <Dropdown.Item
                    as="button"
                    eventKey={LOCALE_VI}
                    className="font-875rem"
                >
                    Tiếng Việt
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

LanguageSwitcher.propTypes = {
    locale: string,
    id: string,
    variant: string,
    size: string
};
