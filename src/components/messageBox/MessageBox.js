import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { complete, getNotification, hideNotification } from 'ra-core';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export const NOTIFICATION_TYPE = {
    INFO: 'info',
    WARNING: 'warning'
};

const bodyMessageStyle = {
    whiteSpace: 'pre-line'
};

export const MessageBox = (props) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const notification = useSelector((state) => getNotification(state));
    const [open, setOpen] = useState(false);
    const btnCloseRef = useRef();

    useEffect(() => {
        const open = !!notification;
        setOpen(open);
        if (open && btnCloseRef.current) btnCloseRef.current.focus();
    }, [notification]);

    const handleRequestClose = () => {
        const { notification } = props;
        if (notification && notification.undoable) {
            dispatch(complete());
        }
        dispatch(hideNotification());
    };

    /* handleExited = () => {
        const {notification, hideNotification, complete} = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    } */

    const notifyType = (notification && notification.type) || NOTIFICATION_TYPE.INFO;
    const { actions } = notification || {};
    const showAction = actions && actions.length > 0;
    return (
        notification ? (
            <Modal
                show={open}
                backdrop="static"
                centered
                onHide={handleRequestClose}
                aria-labelledby="notification"
                dialogClassName={classNames('msg-box', notifyType.length > 0 ? `msg-box-${notifyType}` : '')}
            >
                <Modal.Header className="border-bottom-0 mx-auto">
                    <Modal.Title
                        id="notification"
                        as="h5"
                        className="msg-head"
                    >
                        {translate(`msgBox.heading.${notifyType}`).toUpperCase()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-0">
                    <Container
                        fluid
                        className="msg-body"
                    >
                        <span
                            style={bodyMessageStyle}
                            dangerouslySetInnerHTML={{
                                __html:
                                    notification
                                    && notification.message
                                    && translate(notification.message, notification.messageArgs)
                            }}
                        />
                    </Container>
                </Modal.Body>
                <Modal.Footer className="border-top-0 mx-auto d-flex justify-content-between">
                    <Button
                        size="sm"
                        variant="itech"
                        className="btn-itech-sm btn-itech-dark"
                        ref={btnCloseRef}
                        onClick={handleRequestClose}
                    >
                        {translate(showAction ? 'button.no' : 'button.close')}
                    </Button>
                    {showAction > 0 && actions.map((action, index) => (
                        <Button
                            key={index}
                            variant="itech"
                            size="sm"
                            className={action.className ? action.className : 'btn-itech-primary btn-itech-sm ml-2'}
                            const
                            onClick={() => {
                                dispatch(hideNotification());
                                action.callback();
                            }}
                        >
                            {translate(action.label)}
                        </Button>
                    ))}
                </Modal.Footer>
            </Modal>
        ) : ''
    );
};

MessageBox.propTypes = {
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
        actions: PropTypes.arrayOf(PropTypes.object),
        undoable: PropTypes.bool
    })
    // autoHideDuration: PropTypes.number,
};
