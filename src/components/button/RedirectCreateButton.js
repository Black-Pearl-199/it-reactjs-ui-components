import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const RedirectCreateButton = (props) => {
    const translate = useTranslate();
    const {
        basePath, resource, path = 'create', label, icon
    } = props;
    return (
        <div className="my-auto">
            <Link
                to={`${basePath}/${path}`}
                className="btn btn-sm btn-shadow btn-itech-dark btn-itech-sm text-decoration-none d-block"
            >
                {icon && (
                    <>
                        <FontAwesomeIcon icon={icon} />
                        &nbsp;
                    </>
                )}
                {label ? translate(label) : (`${translate('ra.action.add')} ${translate(`resources.${resource}.name`)}`)}
            </Link>
        </div>
    );
};

RedirectCreateButton.propTypes = {
    basePath: PropTypes.string,
    resource: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.any
};

export default RedirectCreateButton;
