import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import classNames from 'classnames';

import { uuidv4 } from '../../utils';

const MyIconButton = (props) => {
    const translate = useTranslate();
    const { children, popLabel, className, ...rest } = props;
    return (
        <OverlayTrigger
            placement="top"
            overlay={(
                <Tooltip className="itech-tooltip" id={uuidv4()}>
                    {translate(popLabel)}
                </Tooltip>
            )}
        >
            <Button variant="itech-icon" size="sm" className={classNames('btn-itech-icon-primary', className)} {...rest}>
                {children}
            </Button>
        </OverlayTrigger>
    );
};

MyIconButton.propTypes = {
    popLabel: PropTypes.string,
    translate: PropTypes.func
};

export default MyIconButton;