import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isReact from 'is-react';
import { debounce, find } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-admin';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useOnClickOutside } from '../../configurations/hooks';
import { preventDefaultOnClick } from '../../utils';
import Guardian from '../../utils/Guardian';
import DefaultToggle from './DefaultToggle';

const GotG = Guardian.getInstance();

const findInSubs = (items, eventKey) => items.filter((item) => item.subs !== undefined).find((item) => find(item.subs, { eventKey }) !== undefined);
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
    const {
        children,
        className,
        toggle: ToggleComponent,
        config,
        resWidthHideSidebar,
        singleExpand,
        initialExpanded,
        menuClasses,
        menuHeader,
        listItemClasses,
        ...rest
    } = props;
    const { items, collapse: collapseInit } = config;
    const [collapse, setCollapse] = useState(collapseInit);
    const menuItemSubInitial = filterInSubs(items, props.location.pathname);
    const [expandedKeys, setExpandedKeys] = useState(
        initialExpanded || (!!menuItemSubInitial && [menuItemSubInitial.eventKey]) || [props.location.pathname]
    );

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
        // console.log('menu select', e.currentTarget.dataset.eventKey);
        const { eventKey } = e.currentTarget.dataset;
        const menuItem = find(items, { eventKey });
        // console.log('menu select', menuItem);
        if (menuItem) {
            // select primary menu item and it has a subs -> expand sub
            if (menuItem.subs && !menuItem.allowRoute) {
                preventDefaultOnClick(e);
            }
            if (typeof menuItem.onClick === 'function') {
                preventDefaultOnClick(e);
                menuItem.onClick();
            }
            const eventKeyIndex = expandedKeys.indexOf(eventKey);
            // if menu prevent close, keep it open
            if (eventKeyIndex > -1) {
                // nếu cho phép điều hướng ở menu thì giữ trạng thái expand
                if (!menuItem.allowRoute) expandedKeys.splice(eventKeyIndex, 1);
                setExpandedKeys([...expandedKeys]);
            } else if (singleExpand) setExpandedKeys([eventKey]);
            else setExpandedKeys([...expandedKeys, eventKey]);
        } else {
            // find parent of sub -> remove collapse and expand these parent
            const menuItemSub = findInSubs(items, eventKey);
            setCollapse(false);
            if (menuItemSub && expandedKeys.indexOf(menuItemSub.eventKey) === -1) {
                if (singleExpand) setExpandedKeys([menuItemSub.eventKey]);
                else setExpandedKeys([...expandedKeys, menuItemSub.eventKey]);
            }
        }
    };

    const toggleExpand = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { eventKey } = e.currentTarget.dataset;
        const eventKeyIndex = expandedKeys.indexOf(eventKey);
        let newExpandedKeys;
        if (eventKeyIndex > -1) {
            expandedKeys.splice(eventKeyIndex, 1);
            newExpandedKeys = [...expandedKeys];
        } else if (singleExpand) newExpandedKeys = [eventKey];
        else newExpandedKeys = [...expandedKeys, eventKey];
        setExpandedKeys(newExpandedKeys);
    };

    // Call hook passing in the ref and a function to call on outside click
    const clickOutsideCallback = useCallback(() => {
        if (!collapse && window.innerWidth <= resWidthHideSidebar) setCollapse(true);
    }, [collapse, resWidthHideSidebar]);
    useOnClickOutside(ref, clickOutsideCallback);

    const menus = (
        <div className={classNames(menuClasses, 'position-relative')}>
            <div className="w-100 h-100 d-flex flex-column position-absolute">
                {isReact.component(menuHeader) || isReact.element(menuHeader) ? React.cloneElement(menuHeader, { collapse }) : menuHeader}
                <ul className={classNames('sidebar-list', listItemClasses)}>
                    {items.map((item) => {
                        const expanded = expandedKeys.indexOf(item.eventKey) > -1;
                        return (
                            GotG.hasAnyAuthorities(item.permissions) && (
                                <li
                                    key={`menu-${item.eventKey}`}
                                    title={!item.skipTranslate ? translate(item.title) : item.title}
                                    className={classNames(
                                        'sidebar-list-item',
                                        item.subs && 'with-sub-menu',
                                        expanded && 'ba-sidebar-item-expanded',
                                        item.disabled && 'isDisabled'
                                    )}
                                >
                                    <NavLink
                                        exact={item.exact ? !collapse : false}
                                        className="sidebar-list-link"
                                        to={item.url}
                                        isActive={item.isActive}
                                        activeClassName="selected"
                                        onClick={menuSelect}
                                        data-event-key={item.eventKey}
                                    >
                                        {item.icon
                                            && (typeof item.icon === 'string' ? (
                                                <i className={item.icon} />
                                            ) : (
                                                <FontAwesomeIcon icon={item.icon} />
                                            ))}
                                        <span>{!item.skipTranslate ? translate(item.title) : item.title}</span>
                                        {item.subs ? (
                                            <b onClick={toggleExpand} data-event-key={item.eventKey}>
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            </b>
                                        ) : (
                                            ''
                                        )}
                                    </NavLink>
                                    {item.subs ? (
                                        <ul className={['sidebar-sublist', expanded ? 'expanded' : ''].join(' ')}>
                                            {item.subs.map(
                                                (sub) => GotG.hasAnyAuthorities(sub.permissions) && (
                                                    <li
                                                        key={`sub-${sub.eventKey}`}
                                                        title={!sub.skipTranslate ? translate(sub.title) : sub.title}
                                                    >
                                                        <NavLink
                                                            className={classNames('sidebar-list-link', sub.disabled && 'isDisabled')}
                                                            to={sub.url}
                                                            isActive={sub.isActive}
                                                            activeClassName="selected"
                                                            onClick={menuSelect}
                                                            data-event-key={sub.eventKey}
                                                        >
                                                            {sub.icon
                                                                    && (typeof sub.icon === 'string' ? (
                                                                        <i className={item.icon} />
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={item.icon} />
                                                                    ))}
                                                            <span>{!sub.skipTranslate ? translate(sub.title) : sub.title}</span>
                                                        </NavLink>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            )
                        );
                    })}
                </ul>
            </div>
        </div>
    );

    const childrenWithProps = React.Children.map(children, (child) => !!child && React.cloneElement(child, { ...rest, collapse }));

    return (
        <Nav as="aside" className={[className, 'sidebar', 'd-flex', 'flex-column', 'flex-nowrap', collapse ? 'collapse' : '']} ref={ref}>
            <ToggleComponent collapse={collapse} toggleCollapse={toggleCollapse} />
            {menus}
            {childrenWithProps}
        </Nav>
    );
};

SideBar.propTypes = {
    config: PropTypes.object,
    location: PropTypes.object,
    resWidthHideSidebar: PropTypes.number,
    singleExpand: PropTypes.bool,
    initialExpanded: PropTypes.arrayOf(PropTypes.string),
    listItemClasses: PropTypes.string,
    menuClasses: PropTypes.string,
    menuHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    toggle: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};

SideBar.defaultProps = {
    resWidthHideSidebar: 1366,
    singleExpand: true,
    toggle: DefaultToggle
};

export default SideBar;
