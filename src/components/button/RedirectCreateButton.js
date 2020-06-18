import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

export const RedirectCreateButton = (props) => {
    const translate = useTranslate();
    const {
        basePath, resource, path = 'create', label, icon, className, labelClasses
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
                <div className={labelClasses || 'btn-redirect-create-resource'}>
                    {label ? translate(label) : (`${translate('ra.action.add')} ${translate(`resources.${resource}.name`)}`)}
                </div>
            </Link>
        </div>
    );
};

RedirectCreateButton.propTypes = {
    basePath: PropTypes.string,
    resource: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.any,
    className: PropTypes.string,
    labelClasses: PropTypes.string
};

export default RedirectCreateButton;
