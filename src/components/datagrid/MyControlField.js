import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { showNotification, useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { ITCrudDelete } from '../../configurations';
import MyIconButton from '../button/MyIconButton';
import { NOTIFICATION_TYPE } from '../messageBox';

const MyControlField = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const translate = useTranslate();
    const { hasEdit, hasDelete, basePath, resource, record, urlFormat, deleteMessage } = props;
    const { id } = record;

    let url = '';
    if (urlFormat) {
        url = urlFormat(record);
    } else {
        url = `${basePath}/${id}/edit`;
    }
    const resourceName = translate(`resources.${resource}.name`);
    const editCallback = useCallback(() => {
        history.push(url);
    }, []);

    const deleteCallback = useCallback(() => {
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
                                    resourceName
                                })
                            );
                        }
                    }
                ],
                resource_name: resourceName
            })
        );
    }, []);

    return (
        <div className="d-flex">
            {hasEdit && (
                <MyIconButton popLabel="ra.action.edit" onClick={editCallback} className={hasDelete && 'mr-1'}>
                    <FontAwesomeIcon icon={faEdit} />
                </MyIconButton>
            )}
            {hasDelete && (
                <MyIconButton popLabel="ra.action.delete" onClick={deleteCallback} className={hasEdit && 'ml-1'}>
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
    label: PropTypes.string
};

MyControlField.defaultProps = {
    hasEdit: true,
    hasDelete: true,
    deleteMessage: 'ra.message.delete_content',
    label: 'ra.action.editDelete'
};

export default MyControlField;
