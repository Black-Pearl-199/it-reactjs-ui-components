import React, {
    useContext,
    cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-final-form';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ContentSave from '@material-ui/icons/Save';
import classnames from 'classnames';
import isEmpty from 'lodash.isempty';
import {
    useTranslate,
    useNotify,
    FormContext
} from 'ra-core';

const SaveButton = (props) => {
    const form = useForm();
    const { errors } = form.getState();
    const {
        className,
        classes: classesOverride,
        invalid,
        label = 'ra.action.save',
        pristine,
        redirect,
        saving,
        submitOnEnter,
        variant = 'contained',
        icon = defaultIcon,
        onClick,
        handleSubmitWithRedirect,
        onSave,
        ...rest
    } = props;
    const classes = useStyles(props);
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
            // if (invalid) {
            //     notify('ra.message.invalid_form', 'warning');
            // }
            // console.log('errors', errors);
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
            className={classnames(classes.button, className)}
            variant={variant}
            type={type}
            onClick={handleClick}
            color={saving ? 'default' : 'primary'}
            aria-label={displayedLabel}
            {...sanitizeRestProps(rest)}
        >
            {saving ? (
                <CircularProgress
                    size={18}
                    thickness={2}
                    className={classes.leftIcon}
                />
            ) : (
                cloneElement(icon, {
                    className: classnames(classes.leftIcon, classes.icon)
                })
            )}
            {displayedLabel}
        </Button>
    );
};

const defaultIcon = <ContentSave />;

const useStyles = makeStyles(
    (theme) => ({
        button: {
            position: 'relative'
        },
        leftIcon: {
            marginRight: theme.spacing(1)
        },
        icon: {
            fontSize: 18
        }
    }),
    { name: 'RaSaveButton' }
);

const sanitizeRestProps = ({
    basePath,
    handleSubmit,
    record,
    resource,
    undoable,
    ...rest
}) => rest;

SaveButton.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    handleSubmitWithRedirect: PropTypes.func,
    onSave: PropTypes.func,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    pristine: PropTypes.bool,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func
    ]),
    saving: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
    icon: PropTypes.element,
    onClick: PropTypes.func
};

export default SaveButton;
