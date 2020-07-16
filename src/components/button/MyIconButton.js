import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const MyIconButton = (props) => {
    const translate = useTranslate();
    const { children, popLabel, className, enableTooltip, ...rest } = props;
    return enableTooltip ? (
        <OverlayTrigger
            placement="top"
            overlay={(
                <Tooltip className="itech-tooltip" id="icon-btn-tooltip">
                    {translate(popLabel)}
                </Tooltip>
            )}
        >
            <Button variant="itech-icon" size="sm" className={className} {...rest}>
                {children}
            </Button>
        </OverlayTrigger>
    ) : (
        <Button variant="itech-icon" size="sm" className={className} {...rest}>
            {children}
        </Button>
    );
};

MyIconButton.propTypes = {
    className: PropTypes.string,
    popLabel: PropTypes.string,
    translate: PropTypes.func,
    enableTooltip: PropTypes.bool
};

MyIconButton.defaultProps = {
    className: 'btn-itech-icon-primary',
    enableTooltip: true
};

export default MyIconButton;
