import React, { useState } from 'react';
import { useField } from 'react-final-form';
import { useTranslate } from 'react-admin';
import get from 'lodash/get';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const MyCheckboxInput = (props) => {
    const translate = useTranslate();
    const {
        source,
        label,
        resource,
        record,
        hideLabel,
        labelClasses,
        required,
        groupClasses,
        hidden
    } = props;
    const {
        input: { onChange }
    } = useField(source);
    const defaultValue = get(record, source, false);
    const [checked, setChecked] = useState(defaultValue);
    const labelDisplay = translate(
        label || `resources.${resource}.fields.${source}`
    );

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChange(event.target.checked);
    };

    return (
        <div
            className={classNames(
                'form-group',
                groupClasses,
                hidden ? 'd-none' : null
            )}
        >
            {!hideLabel ? (
                <label
                    className={classNames(
                        'col-form-label',
                        labelClasses,
                        required ? 'label-required' : null
                    )}
                >
                    {labelDisplay}
                </label>
            ) : null}
            <FormControlLabel
                control={(
                    <Checkbox
                        disabled={props.readOnly}
                        checked={checked}
                        onChange={handleChange}
                        name={source}
                        color="primary"
                    />
                )}
                className="mx-1"
                label={null}
            />
        </div>
    );
};

MyCheckboxInput.propTypes = {
    source: PropTypes.string.isRequired,
    resource: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    required: PropTypes.bool,
    hideLabel: PropTypes.bool,
    readOnly: PropTypes.bool,
    labelClasses: PropTypes.string,
    groupClasses: PropTypes.string,
    hidden: PropTypes.bool
};

MyCheckboxInput.defaultProps = {
    record: {},
    hideLabel: false,
    readOnly: false,
    hidden: false
};
