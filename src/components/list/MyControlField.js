import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { showNotification, useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ITCrudDelete } from '../../configurations';
import { preventDefaultOnClick, getNotificationName } from '../../utils';
import MyIconButton from '../button/MyIconButton';
import { NOTIFICATION_TYPE } from '../messageBox';

const MyControlField = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const translate = useTranslate();
    const {
        className,
        hasEdit,
        hasDelete,
        basePath,
        resource,
        record,
        urlFormat,
        deleteMessage,
        deleteCallback,
        getNotificationName,
        optimisticDelete,
        enableTooltip,
        btnEditClasses,
        btnDeleteClasses,
        updatableField,
        deletableField
    } = props;
    const { id } = record;
    const updatable = updatableField ? record[updatableField] : true;
    const deletable = deletableField ? record[deletableField] : true;

    let url = '';
    if (urlFormat) {
        url = urlFormat(record);
    } else {
        url = `${basePath}/${id}/edit`;
    }

    const resourceName = getNotificationName(record, resource, translate);

    const onEdit = useCallback(() => {
        history.push(url);
    }, [history, url]);

    const onDelete = useCallback(() => {
        dispatch(
            showNotification(deleteMessage, NOTIFICATION_TYPE.INFO, {
                actions: [
                    {
                        label: 'button.delete',
                        callback: () => {
                            dispatch(
                                ITCrudDelete({
                                    resource,
                                    id,
                                    record,
                                    basePath,
                                    resourceName,
                                    callback: deleteCallback,
                                    optimistic: optimisticDelete
                                })
                            );
                        }
                    }
                ],
                messageArgs: {
                    resourceName,
                    ...record
                }
            })
        );
    }, [basePath, deleteMessage, dispatch, id, record, resource, resourceName, deleteCallback, optimisticDelete]);

    return (
        <div className={classNames('d-flex', className)} onClick={preventDefaultOnClick}>
            {hasEdit && updatable && (
                <MyIconButton
                    enableTooltip={enableTooltip}
                    popLabel="ra.action.edit"
                    onClick={onEdit}
                    className={(hasDelete && 'mr-1', btnEditClasses)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </MyIconButton>
            )}
            {hasDelete && deletable && (
                <MyIconButton
                    enableTooltip={enableTooltip}
                    popLabel="ra.action.delete"
                    onClick={onDelete}
                    className={(hasEdit && 'ml-1', btnDeleteClasses)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </MyIconButton>
            )}
        </div>
    );
};

MyControlField.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    hasEdit: PropTypes.bool,
    hasDelete: PropTypes.bool,
    urlFormat: PropTypes.func,
    deleteMessage: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    label: PropTypes.string,
    getNotificationName: PropTypes.func,
    optimisticDelete: PropTypes.bool,
    deleteCallback: PropTypes.func,
    enableTooltip: PropTypes.bool,
    btnEditClasses: PropTypes.string,
    btnDeleteClasses: PropTypes.string,
    updatableField: PropTypes.string,
    deletableField: PropTypes.string
};

MyControlField.defaultProps = {
    hasEdit: true,
    hasDelete: true,
    deleteMessage: 'commons.message.delete',
    label: 'ra.action.editDelete',
    getNotificationName,
    optimisticDelete: false,
    enableTooltip: true,
    btnEditClasses: 'btn-itech-icon-primary',
    btnDeleteClasses: 'btn-itech-icon-primary'
};

export default MyControlField;
