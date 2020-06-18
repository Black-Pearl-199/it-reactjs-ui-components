import * as PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ITCrudDelete } from '../../configurations/actions';
import { getNotificationName } from '../../utils';
import MyBootstrapInput from '../form/MyBootstrapInput';

const MyDeleteButton = ({ ...props }) => {
    // console.log('deleteBox props', props);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { resource, id, callback, redirect = 'list', fixed, basePath, optimistic, record = {}, getNotificationName } = props;
    const resourceName = getNotificationName({ values: record }, resource, translate);
    const [inputValue, setInputValue] = useState({ reason: '' });
    const [showPopup, setShowPopup] = useState(false);

    const onReasonChange = useCallback((e) => {
        setInputValue({ ...inputValue, ...e });
    }, [inputValue]);

    const showConfirm = useCallback((e) => {
        e.preventDefault();
        setShowPopup(true);
    }, []);
    const hidePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    const onDelete = () => {
        hidePopup();
        dispatch(
            ITCrudDelete({
                resource,
                previousData: record,
                id,
                redirectTo: redirect,
                reason: inputValue.reason,
                basePath,
                resourceName,
                optimistic,
                callback
            })
        );
    };

    return (
        <div className={`px-3 ${fixed ? 'position-fixed' : ''}`}>
            <div>
                <button type="button" className="btn btn-itech btn-itech-secondary btn-itech-fixed" onClick={showConfirm}>
                    {translate('button.delete')}
                </button>
            </div>
            <Modal show={showPopup} onHide={hidePopup} centered size="md">
                <Modal.Header>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: translate('commons.message.delete', { resourceName })
                        }}
                    />
                </Modal.Header>
                <Modal.Body>
                    <Container fluid className="justify-content-between">
                        <MyBootstrapInput
                            label="deleteReason"
                            source="reason"
                            small={false}
                            inputValue={inputValue}
                            onInputChange={onReasonChange}
                            groupClasses="row"
                            inputClasses="flex-grow-1"
                            labelClasses="label-required col-4 pl-0"
                        />
                    </Container>
                </Modal.Body>
                <Modal.Footer className="d-flex flex-row-reverse justify-content-around">
                    <Button
                        variant="itech"
                        className="btn-danger btn-itech-fixed"
                        onClick={onDelete}
                        disabled={inputValue.reason.length < 3}
                    >
                        {translate('button.delete')}
                    </Button>
                    <Button variant="itech" className="btn-itech-secondary btn-itech-fixed mr-3" onClick={hidePopup}>
                        {translate('commons.no')}
                    </Button>
                </Modal.Footer>
            </Modal>
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
    getNotificationName: PropTypes.func
};

MyDeleteButton.defaultProps = {
    fixed: false,
    getNotificationName
};

export default MyDeleteButton;
