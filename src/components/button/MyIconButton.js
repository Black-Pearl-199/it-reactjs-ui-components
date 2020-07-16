import { bool, func, string } from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const MyIconButton = (props) => {
    const translate = useTranslate();
    const { children, popLabel, className, enableTooltip, placement, ...rest } = props;
    return enableTooltip ? (
        <OverlayTrigger
            placement={placement}
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
    className: string,
    popLabel: string,
    translate: func,
    enableTooltip: bool,
    placement: string
};

MyIconButton.defaultProps = {
    className: 'btn-itech-icon-primary',
    enableTooltip: true,
    placement: 'top'
};

export default MyIconButton;
