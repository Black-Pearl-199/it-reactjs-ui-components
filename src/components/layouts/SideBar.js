import React, { useState, useEffect, useRef } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { NavLink } from 'react-router-dom';
import find from 'lodash.find';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslate } from 'react-admin';

import version from '../../version';

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

export const SideBar = (props) => {
    const translate = useTranslate();
    const ref = useRef();
    const { items, collapse: collapseTemp } = props.config;
    const [collapse, setCollapse] = useState(collapseTemp);
    const menuItemSubInitial = filterInSubs(items, props.location.pathname);
    const [expandedKey, setExpandedKey] = useState((!!menuItemSubInitial && menuItemSubInitial.eventKey) || props.location.pathname);

    const toggleCollapse = () => {
        setCollapse(!collapse);
    };

    let onResize;

    const checkSideBarCollapse = () => {
        const isViewer = props.location.pathname.startsWith('/viewer');

        if (onResize) clearTimeout(onResize);
        onResize = setTimeout(() => {
            if (
                isViewer
                || (!collapse && window.innerWidth <= props.resWidthHideSidebar)
            ) {
                setCollapse(true);
            }
            onResize = undefined;
        }, 200);
    };

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

    // Hook
    const useOnClickOutside = (ref, handler) => {
        useEffect(
            () => {
                const listener = (event) => {
                    // Do nothing if clicking ref's element or descendent elements
                    if (!ref.current || ref.current.contains(event.target)) {
                        return;
                    }
                    checkSideBarCollapse();
                };

                document.addEventListener('resize', listener);

                return () => {
                    document.removeEventListener('resize', listener);
                };
            },
            // Add ref and handler to effect dependencies
            // It's worth noting that because passed in handler is a new ...
            // ... function on every render that will cause this effect ...
            // ... callback/cleanup to run every render. It's not a big deal ...
            // ... but to optimize you can wrap handler in useCallback before ...
            // ... passing it into this hook.
            [ref, handler]
        );
    };

    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => toggleCollapse());

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
            <div className="version">
                {`v${version}${process.env.REACT_APP_ENV}`}
            </div>
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
