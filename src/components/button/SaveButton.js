import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormContext, useNotify, useTranslate } from 'react-admin';
import { useForm } from 'react-final-form';

const SaveButton = (props) => {
    const form = useForm();
    const {
        className,
        label = 'ra.action.save',
        redirect,
        saving,
        submitOnEnter,
        variant = 'itech',
        size = 'sm',
        icon,
        onClick,
        handleSubmitWithRedirect,
        onSave
    } = props;
    const notify = useNotify();
    const translate = useTranslate();
    const { setOnSave } = useContext(FormContext);

    const getInvalidMessages = (syncErrors) => {
        let result = [];
        Object.values(syncErrors).forEach((value) => {
            if (typeof value === 'string') {
                result.push(translate ? translate(value) : value);
            } else if (typeof value === 'object') {
                result = [...result, ...getInvalidMessages(value)];
            }
        });
        return result;
    };
    const handleClick = (event) => {
        if (typeof onSave === 'function') {
            setOnSave(onSave);
        } else {
            // we reset to the Form default save function
            setOnSave();
        }
        if (saving) {
            // prevent double submission
            event.preventDefault();
        } else {
            const { errors } = form.getState();
            if (!isEmpty(errors)) {
                notify('commons.message.error', 'warning', { error: getInvalidMessages(errors).join('\n') });
            }
            // always submit form explicitly regardless of button type
            if (event) {
                event.preventDefault();
            }
            handleSubmitWithRedirect(redirect);
        }

        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    const type = submitOnEnter ? 'submit' : 'button';
    const displayedLabel = label && translate(label, { _: label });
    return (
        <Button
            className={classnames('btn-itech-primary btn-itech-fixed', className)}
            variant={variant}
            size={size}
            type={type}
            onClick={handleClick}
        >
            {icon && (
                <>
                    <FontAwesomeIcon icon={icon} />
                </>
            )}
            {displayedLabel}
        </Button>
    );
};

SaveButton.propTypes = {
    className: PropTypes.string,
    handleSubmitWithRedirect: PropTypes.func,
    onSave: PropTypes.func,
    label: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    saving: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    variant: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    size: PropTypes.string
};

export default SaveButton;
