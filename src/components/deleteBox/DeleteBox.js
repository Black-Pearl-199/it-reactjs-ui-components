import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ITCrudDelete } from '../../configurations/actions';
import MyBootstrapInput from '../form/MyBootstrapInput';

export const DeleteBox = ({ ...props }) => {
    // console.log('deleteBox props', props);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const {
        id, resource, basePath, fixed, callback, redirect = 'list'
    } = props;

    const [inputValue, setInputValue] = useState({ reason: '' });
    const [showPopup, setShowPopup] = useState(false);

    const onReasonChange = (e) => {
        setInputValue({ ...inputValue, ...e });
    };

    const showConfirm = () => {
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
            id,
            redirectTo: redirect,
            reason: inputValue.reason,
            basePath,
            resourceName: translate('resources.study.name'),
            callback
        }));
    };

    return (
        <div className={`delete-box d-flex align-items-center px-5 ${fixed ? 'position-fixed' : ''}`}>
            <MyBootstrapInput
                label="deleteReason"
                source="reason"
                small={false}
                inputValue={inputValue}
                onInputChange={onReasonChange}
                className="bg-white"
                groupClasses="form-inline col-xl-6 col-lg-8 col-md-10"
                inputClasses="flex-grow-1"
                labelClasses="label-required mr-3"
            />
            <div>
                <button
                    type="button"
                    className="btn btn-itech-secondary btn-itech-fixed"
                    onClick={showConfirm}
                    disabled={inputValue.reason.length < 3}
                >
                    {translate('button.delete')}
                </button>
            </div>
            <Modal show={showPopup} onHide={hidePopup} centered size="md">
                {/* <Modal.Header>{translate(`page.modality.text.selectRentType`)}</Modal.Header> */}
                <Modal.Body>
                    <Container fluid>
                        {translate('commons.message.delete', { resourceName: translate('resources.study.name') })}
                    </Container>
                </Modal.Body>
                <Modal.Footer className="d-flex flex-row-reverse justify-content-around">
                    <Button
                        variant="itech btn-itech-primary btn-itech-fixed"
                        onClick={onDelete}
                    >
                        {translate('commons.yes')}
                    </Button>
                    <Button
                        variant="itech btn-itech-secondary btn-itech-fixed mr-3"
                        onClick={hidePopup}
                    >
                        {translate('commons.no')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

DeleteBox.propTypes = {
    resource: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    callback: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    basePath: PropTypes.string
};

DeleteBox.defaultProps = {
    fixed: false
};

export default DeleteBox;
