import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ITCrudDelete } from '../../configurations/actions';
import { notificationName } from '../../utils';
import MyBootstrapInput from '../form/MyBootstrapInput';

export const MyDeleteBox = ({ ...props }) => {
    // console.log('deleteBox props', props);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const {
        resource, id, callback, redirect = 'list', fixed, basePath, optimistic, record = {}
    } = props;
    const resourceName = notificationName({ values: record }, resource, translate);
    const [inputValue, setInputValue] = useState({ reason: '' });
    const [showPopup, setShowPopup] = useState(false);

    const onReasonChange = (e) => {
        setInputValue({ ...inputValue, ...e });
    };

    const showConfirm = (e) => {
        e.preventDefault();
        console.log('show popup input reason');
        setShowPopup(true);
    };
    const hidePopup = () => {
        setShowPopup(false);
    };

    const onDelete = () => {
        // for test callback only
        // if (callback) callback();
        // return;

        hidePopup();
        dispatch(ITCrudDelete({
            resource,
            previousData: record,
            id,
            redirectTo: redirect,
            reason: inputValue.reason,
            basePath,
            resourceName,
            optimistic,
            callback
        }));
    };

    return (
        <div className={`px-3 ${fixed ? 'position-fixed' : ''}`}>
            <div>
                <button
                    type="button"
                    className="btn btn-itech btn-itech-secondary btn-itech-fixed"
                    onClick={showConfirm}
                >
                    {translate('button.delete')}
                </button>
            </div>
            <Modal show={showPopup} onHide={hidePopup} centered size="md">
                <Modal.Header>
                    <span dangerouslySetInnerHTML={{
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
                    <Button
                        variant="itech"
                        className="btn-itech-secondary btn-itech-fixed mr-3"
                        onClick={hidePopup}
                    >
                        {translate('commons.no')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

MyDeleteBox.propTypes = {
    resource: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    fixed: PropTypes.bool,
    callback: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    basePath: PropTypes.string,
    optimistic: PropTypes.bool,
    record: PropTypes.object
};

MyDeleteBox.defaultProps = {
    fixed: false
};
