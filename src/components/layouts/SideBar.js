import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { debounce, find } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useOnClickOutside } from '../../configurations/hooks';

const findInSubs = (items, eventKey) => items
    .filter((item) => item.subs !== undefined)
    .find((item) => find(item.subs, { eventKey }) !== undefined);
const filterInSubs = (items, eventKey) => items
    .filter((item) => item.subs !== undefined)
    .find((item) => {
        const filteredSubs = item.subs.filter((sub) => eventKey.startsWith(sub.eventKey));
        if (filteredSubs && filteredSubs.length > 0) {
            return true;
        }
        return false;
    });

const SideBar = (props) => {
    const translate = useTranslate();
    const ref = useRef();
    const { children, config, resWidthHideSidebar, ...rest } = props;
    const { items, collapse: collapseInit } = config;
    const [collapse, setCollapse] = useState(collapseInit);
    const menuItemSubInitial = filterInSubs(items, props.location.pathname);
    const [expandedKey, setExpandedKey] = useState((!!menuItemSubInitial && menuItemSubInitial.eventKey) || props.location.pathname);

    const toggleCollapse = useCallback(() => {
        setCollapse(!collapse);
    }, [collapse]);

    useEffect(() => {
        const checkSideBarCollapse = debounce(() => {
            if (window.innerWidth <= resWidthHideSidebar) setCollapse(true);
        }, 300);
        window.addEventListener('resize', checkSideBarCollapse);

        return () => {
            window.removeEventListener('resize', checkSideBarCollapse);
        };
    }, [resWidthHideSidebar]);

    const menuSelect = (e) => {
        // console.log(e.currentTarget.dataset['eventKey']);
        const { eventKey } = e.currentTarget.dataset;
        const menuItem = find(items, { eventKey });
        // console.log('menu select', menuItem);
        if (menuItem) {
            // select primary menu item and it has a subs -> expand sub
            if (menuItem.subs) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (expandedKey === eventKey) {
                setExpandedKey(undefined);
            } else setExpandedKey(eventKey);
        } else {
            // find parent of sub -> remove collapse and expand these parent
            const menuItemSub = findInSubs(items, eventKey);
            setCollapse(false);
            setExpandedKey(menuItemSub ? menuItemSub.eventKey : undefined);
        }
    };

    const toggleExpand = (e) => {
        const { eventKey } = e.currentTarget.dataset;
        if (expandedKey && expandedKey === eventKey) {
            e.stopPropagation();
            e.preventDefault();
            setExpandedKey(undefined);
        }
    };

    // Call hook passing in the ref and a function to call on outside click
    const clickOutsideCallback = useCallback(() => {
        if (!collapse && window.innerWidth <= resWidthHideSidebar) setCollapse(true);
    }, [collapse, resWidthHideSidebar]);
    useOnClickOutside(ref, clickOutsideCallback);

    const menus = (
        <div ref={ref}>
            <ul className="sidebar-list">
                {items.map((item, index) => (
                    <li
                        key={`menu-${index}`}
                        title={translate(item.title)}
                        className={classNames(
                            'sidebar-list-item',
                            item.subs ? 'with-sub-menu' : '',
                            expandedKey === item.eventKey
                                ? 'ba-sidebar-item-expanded'
                                : '',
                            item.disabled ? 'isDisabled' : ''
                        )}
                    >
                        <NavLink
                            className="sidebar-list-link"
                            to={item.url}
                            activeClassName="selected"
                            onClick={menuSelect}
                            data-event-key={item.eventKey}
                        >
                            {item.icon ? (
                                <FontAwesomeIcon icon={item.icon} />
                            ) : (
                                ''
                            )}
                            <span>{translate(item.title)}</span>
                            {item.subs ? (
                                <b
                                    onClick={toggleExpand}
                                    data-event-key={item.eventKey}
                                >
                                    <FontAwesomeIcon icon={faAngleUp} />
                                </b>
                            ) : (
                                ''
                            )}
                        </NavLink>
                        {item.subs ? (
                            <ul
                                className={[
                                    'sidebar-sublist',
                                    expandedKey === item.eventKey
                                        ? 'expanded'
                                        : ''
                                ].join(' ')}
                            >
                                {item.subs.map((sub, index1) => (
                                    <li
                                        key={`sub-${index1}`}
                                        title={translate(sub.title)}
                                    >
                                        <NavLink
                                            className={classNames(
                                                'sidebar-list-link',
                                                sub.disabled && 'isDisabled'
                                            )}
                                            to={sub.url}
                                            activeClassName="selected"
                                            onClick={menuSelect}
                                            data-event-key={sub.eventKey}
                                        >
                                            <span>{translate(sub.title)}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            ''
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    const childrenWithProps = React.Children.map(children, (child) => (!!child && React.cloneElement(child, { ...rest })));

    return (
        <Nav
            as="aside"
            className={['sidebar', 'flex-column', collapse ? 'collapse' : '']}
        >
            <div className="w-100">
                <Button
                    variant="default"
                    onClick={toggleCollapse}
                    className="toggle-collapse mx-auto"
                >
                    <FontAwesomeIcon icon={faBars} />
                </Button>
            </div>
            {menus}
            {childrenWithProps}
        </Nav>
    );
};

SideBar.propTypes = {
    resWidthHideSidebar: PropTypes.number,
    config: PropTypes.object,
    location: PropTypes.object
};

SideBar.defaultProps = {
    resWidthHideSidebar: 1366
};

export default SideBar;
