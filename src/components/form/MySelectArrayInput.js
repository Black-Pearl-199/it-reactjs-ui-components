import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useField } from 'react-final-form';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    noLabel: {
        marginTop: theme.spacing(3)
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const MultipleSelect = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const {
        source,
        choices,
        optionValue,
        optionText,
        label,
        resource,
        record,
        hideLabel,
        labelClasses,
        inputClasses,
        required,
        groupClasses,
        hidden
    } = props;
    const defaultValue = (record && record[source]) || [];
    console.log('resource', props);
    const labelDisplay = translate(
        label || `resources.${resource}.fields.${source}`
    );
    const [multipleSelectValue, setMultipleSelectValue] = useState(
        defaultValue
    );
    const {
        input: { onChange }
    } = useField(source);

    const handleChange = (event) => {
        setMultipleSelectValue(event.target.value);
        onChange(event.target.value);
        console.log('multipleSelect', event.target.value);
    };

    return (
        <div
            className={classNames(
                'form-group',
                groupClasses,
                hidden ? 'd-none' : null
            )}
        >
            {/* <InputLabel id="mutiple-checkbox-label">{labelDisplay}</InputLabel> */}
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
            <div className={inputClasses}>
                <Select
                    labelId="mutiple-checkbox-label"
                    id="mutiple-checkbox"
                    className="w-100"
                    disabled={props.readOnly}
                    multiple
                    value={multipleSelectValue}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} color="primary" />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {choices.map((item, key) => (
                        <MenuItem key={key} value={item[optionValue]}>
                            <Checkbox
                                color="primary"
                                checked={
                                    multipleSelectValue.findIndex(
                                        (selectedValue) => selectedValue === item[optionValue]
                                    ) > -1
                                }
                            />
                            <ListItemText primary={item[optionText]} />
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

MultipleSelect.propTypes = {
    source: PropTypes.string.isRequired,
    resource: PropTypes.string,
    choices: PropTypes.array.isRequired,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    required: PropTypes.bool,
    hideLabel: PropTypes.bool,
    labelClasses: PropTypes.string,
    groupClasses: PropTypes.string,
    hidden: PropTypes.bool,
    inputClasses: PropTypes.string,
    readOnly: PropTypes.bool
};

MultipleSelect.defaultProps = {
    optionText: 'name',
    optionValue: 'id',
    record: {},
    required: false,
    hideLabel: false,
    hidden: false,
    readOnly: false
};

export const MySelectArrayInput = MultipleSelect;
