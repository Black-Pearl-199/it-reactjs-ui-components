import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { showNotification, useTranslate } from 'react-admin';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ITCrudDelete } from '../../configurations/actions';
import { getNotificationName } from '../../utils';
import { NOTIFICATION_TYPE } from '../messageBox';

const MyDeleteButton = (props) => {
    // console.log('deleteBox props', props);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { resource, id, callback, redirect = 'list', fixed, basePath, optimistic, record = {}, deleteMessage } = props;
    const resourceName = getNotificationName({ values: record }, resource, translate);

    const onDelete = useCallback(() => {
        dispatch(
            showNotification(deleteMessage, NOTIFICATION_TYPE.INFO, {
                actions: [
                    {
                        label: 'button.delete',
                        callback: () => {
                            dispatch(
                                ITCrudDelete({
                                    redirect,
                                    resource,
                                    id,
                                    record,
                                    basePath,
                                    resourceName,
                                    callback,
                                    optimistic
                                })
                            );
                        }
                    }
                ],
                messageArgs: {
                    resourceName
                }
            })
        );
    }, [redirect, basePath, deleteMessage, dispatch, id, record, resource, resourceName, callback, optimistic]);

    return (
        <div className={`px-3 ${fixed ? 'position-fixed' : ''}`}>
            <div>
                <Button variant="itech" size="sm" className="btn-itech-delete btn-itech-fixed" onClick={onDelete}>
                    {translate('button.delete')}
                </Button>
            </div>
        </div>
    );
};

MyDeleteButton.propTypes = {
    resource: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    fixed: PropTypes.bool,
    callback: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    basePath: PropTypes.string,
    optimistic: PropTypes.bool,
    record: PropTypes.object,
    deleteMessage: PropTypes.string
};

MyDeleteButton.defaultProps = {
    fixed: false,
    deleteMessage: 'commons.message.delete'
};

export default MyDeleteButton;
