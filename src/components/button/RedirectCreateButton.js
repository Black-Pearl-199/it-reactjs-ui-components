import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const RedirectCreateButton = (props) => {
    const translate = useTranslate();
    const {
        basePath, path = 'create', icon, className, label
    } = props;
    return (
        <div className="my-auto">
            <Link
                to={`${basePath}/${path}`}
                className={className || 'btn btn-sm btn-shadow btn-itech-dark btn-itech btn-itech-fixed text-decoration-none d-block'}
            >
                {icon && (
                    <>
                        <FontAwesomeIcon icon={icon} />
                        &nbsp;
                    </>
                )}
                {label ? translate(label) : translate('button.createNew')}
            </Link>
        </div>
    );
};

RedirectCreateButton.propTypes = {
    basePath: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.any,
    className: PropTypes.string,
    label: PropTypes.string
};

export default RedirectCreateButton;
