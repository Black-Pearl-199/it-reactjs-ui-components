import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MyBackFormButton = ({ basePath }) => {
    const history = useHistory();
    const translate = useTranslate();
    const goBack = useCallback(() => {
        history.replace(basePath);
    }, [basePath, history]);

    return (
        <Button
            variant="itech"
            size="sm"
            className="btn btn-primary btn-itech-fixed ml-2"
            onClick={goBack}
        >
            {translate('button.back')}
        </Button>
    );
};

MyBackFormButton.propTypes = {
    basePath: PropTypes.string
};

export default MyBackFormButton;
