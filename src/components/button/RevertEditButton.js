import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';

const RevertEditButton = (props) => {
    const { changeEditState } = props;

    const translate = useTranslate();
    const form = useForm();
    const goBack = useCallback(() => {
        changeEditState(false);
        form.setConfig('keepDirtyOnReinitialize', false);
        form.reset();
        form.setConfig('keepDirtyOnReinitialize', true);
    }, [changeEditState, form]);

    return (
        <Button
            variant="itech"
            size="sm"
            className="btn btn-itech-secondary btn-itech-fixed"
            onClick={goBack}
        >
            {translate('button.revertEdit')}
        </Button>
    );
};

RevertEditButton.propTypes = {
    changeEditState: PropTypes.func
};

export default RevertEditButton;
