import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import { useField, useForm } from 'react-final-form';
import { checkboxStyles } from '../MyCustomStyles';

const useStyles = makeStyles(checkboxStyles, { name: 'RaCheckboxGroupInputItem' });

const MyCheckboxInput = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const {
        source,
        label,
        inputLabel,
        hiddenInputLabel,
        resource,
        // record,
        hideLabel,
        labelClasses,
        required,
        groupClasses,
        hidden,
        skipTranslate
    } = props;
    const {
        input: { onChange }
    } = useField(source);
    const form = useForm();
    const defaultValue = get(form.getState().values, source, false);
    const [checked, setChecked] = useState(defaultValue);
    const labelDisplay = hideLabel ? '' : translate(label || `resources.${resource}.fields.${source}`);
    // eslint-disable-next-line no-nested-ternary
    const inputLabelDisplay = hiddenInputLabel ? '' : skipTranslate ? inputLabel : translate(inputLabel);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <div className={classNames('form-group', groupClasses, hidden ? 'd-none' : null)}>
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>{labelDisplay}</label>
            ) : null}
            <FormControlLabel
                control={(
                    <Checkbox
                        className={classes.root}
                        checkedIcon={<span className={classNames(classes.icon, classes.checkedIcon)} />}
                        icon={<span className={classes.icon} />}
                        disabled={props.readOnly}
                        checked={checked}
                        onChange={handleChange}
                        name={source}
                        color="default"
                    />
                )}
                className="mx-1"
                label={<span style={{ color: '#333333' }}>{inputLabelDisplay}</span>}
            />
        </div>
    );
};

MyCheckboxInput.propTypes = {
    source: PropTypes.string.isRequired,
    resource: PropTypes.string,
    label: PropTypes.string,
    // record: PropTypes.object,
    required: PropTypes.bool,
    hideLabel: PropTypes.bool,
    readOnly: PropTypes.bool,
    labelClasses: PropTypes.string,
    groupClasses: PropTypes.string,
    hidden: PropTypes.bool,
    inputLabel: PropTypes.string,
    hiddenInputLabel: PropTypes.bool,
    skipTranslate: PropTypes.bool
};

MyCheckboxInput.defaultProps = {
    // record: {},
    hiddenInputLabel: true,
    hideLabel: false,
    readOnly: false,
    hidden: false,
    skipTranslate: false
};

export default MyCheckboxInput;
