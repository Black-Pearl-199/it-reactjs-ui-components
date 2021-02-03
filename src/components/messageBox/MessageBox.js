import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { complete, getNotification, hideNotification, useTranslate } from 'react-admin';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from '../../configurations/hooks';
import NOTIFICATION_TYPE from './NotificationType';

const bodyMessageStyle = {
    whiteSpace: 'pre-line',
    textAlign: 'center'
};

const MessageBox = (props) => {
    const { animation = true } = props;
    const timerRef = useRef();
    const translate = useTranslate();
    const dispatch = useDispatch();
    const notification = useShallowEqualSelector(getNotification);
    const [open, setOpen] = useState(!!notification);
    const btnCloseRef = useRef();

    useEffect(() => {
        const open = !!notification;
        setOpen(open);
        if (open && btnCloseRef.current) btnCloseRef.current.focus();
    }, [notification]);

    const handleRequestClose = useCallback(() => {
        // const { notification } = props;
        if (notification && notification.undoable) {
            dispatch(complete());
        }
        dispatch(hideNotification());
    }, [dispatch, notification]);

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

    useEffect(() => {
        if (notifyType === NOTIFICATION_TYPE.AUTO_HIDE_INFO || notifyType === NOTIFICATION_TYPE.AUTO_HIDE_WARNING) {
            timerRef.current = setTimeout(handleRequestClose, 3500);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [handleRequestClose, notifyType]);

    return notification ? (
        <>
            {notifyType === NOTIFICATION_TYPE.INFO || notifyType === NOTIFICATION_TYPE.WARNING ? (
                <Modal
                    show={open}
                    backdrop="static"
                    centered
                    onHide={handleRequestClose}
                    aria-labelledby="notification"
                    dialogClassName={classNames('msg-box', notifyType.length > 0 ? `msg-box-${notifyType}` : '')}
                    animation={animation}
                >
                    <Modal.Header className="border-bottom-0 mx-auto">
                        <Modal.Title id="notification" as="h5" className="msg-head">
                            {translate(`msgBox.heading.${notifyType}`).toUpperCase()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-4 py-0">
                        <Container fluid className="msg-body">
                            <p
                                style={bodyMessageStyle}
                                dangerouslySetInnerHTML={{
                                    __html: notification && notification.message && translate(notification.message, notification.messageArgs)
                                }}
                            />
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="border-top-0 mx-auto d-flex justify-content-between">
                        {showAction > 0
                        && actions.map((action, index) => (
                            <Button
                                key={index}
                                variant="itech"
                                size="sm"
                                className={action.className ? action.className : 'btn-itech-primary ml-2  btn-itech-fixed'}
                                onClick={() => {
                                    dispatch(hideNotification());
                                    action.callback();
                                }}
                            >
                                {translate(action.label)}
                            </Button>
                        ))}
                        <Button size="sm" variant="itech" className="btn-itech-dark btn-itech-fixed" ref={btnCloseRef} onClick={handleRequestClose}>
                            {translate(showAction ? 'button.no' : 'button.close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <div
                    className="d-flex flex-row justify-content-center position-fixed shadow modal-content px-2"
                    style={{
                        zIndex: 500,
                        width: '300px',
                        minHeight: '40px',
                        right: '5px',
                        top: '5px',
                        backgroundColor: `${notifyType === NOTIFICATION_TYPE.AUTO_HIDE_INFO ? '' : 'var(--danger)'}`
                    }}
                >
                    <p
                        className="my-auto flex-1"
                        style={bodyMessageStyle}
                        dangerouslySetInnerHTML={{
                            __html: notification && notification.message && translate(notification.message, notification.messageArgs)
                        }}
                    />
                    <span className="float-right ml-3" id="closeMsg">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={handleRequestClose} />
                    </span>
                </div>
            )}
        </>
    ) : (
        ''
    );
};

MessageBox.propTypes = {
    // notification: PropTypes.shape({
    //     message: PropTypes.string,
    //     type: PropTypes.string,
    //     autoHideDuration: PropTypes.number,
    //     messageArgs: PropTypes.object,
    //     actions: PropTypes.arrayOf(PropTypes.object),
    //     undoable: PropTypes.bool
    // })
    // autoHideDuration: PropTypes.number,
    animation: PropTypes.bool
};

export default MessageBox;
