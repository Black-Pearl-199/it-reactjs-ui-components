import { Checkbox, Chip, Input, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core';
import classNames from 'classnames';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslate } from 'react-admin';
import { useField, useForm } from 'react-final-form';
import { checkboxStyles } from '../MyCustomStyles';
import variables from '../../assets/scss/abstracts/_export.scss';

const useCheckboxStyles = makeStyles(checkboxStyles, { name: 'Bass-MSAI' });

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

const MySelectArrayInput = (props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const classesCheckbox = useCheckboxStyles();
    const form = useForm();
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
    const labelDisplay = translate(label || `resources.${resource}.fields.${source}`);
    const [multipleSelectValue, setMultipleSelectValue] = useState(defaultValue);
    const {
        input: { onChange }
    } = useField(source);

    const handleChange = (event) => {
        setMultipleSelectValue(event.target.value);
        onChange(event.target.value);
    };

    useEffect(() => {
        const currentValue = get(form.getState().values, source) || [];
        // check khi reset form
        if (
            JSON.stringify(defaultValue) === JSON.stringify(currentValue)
            && JSON.stringify(multipleSelectValue) !== JSON.stringify(currentValue)
        ) {
            setMultipleSelectValue(currentValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(form.getState().values)]);
    return (
        <div className={classNames('form-group', groupClasses, hidden ? 'd-none' : null)}>
            {/* <InputLabel id="mutiple-checkbox-label">{labelDisplay}</InputLabel> */}
            {!hideLabel ? (
                <label className={classNames('col-form-label', labelClasses, required ? 'label-required' : null)}>{labelDisplay}</label>
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
                                <Chip key={value} label={value} className={classes.chip} color={variables.primaryBgDark} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {choices.map((item) => (
                        <MenuItem key={item[optionValue]} value={item[optionValue]}>
                            <Checkbox
                                color="default"
                                className={classesCheckbox.root}
                                checkedIcon={<span className={classNames(classesCheckbox.icon, classesCheckbox.checkedIcon)} />}
                                icon={<span className={classesCheckbox.icon} />}
                                checked={multipleSelectValue.findIndex((selectedValue) => selectedValue === item[optionValue]) > -1}
                            />
                            <ListItemText primary={item[optionText]} />
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

MySelectArrayInput.propTypes = {
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

MySelectArrayInput.defaultProps = {
    optionText: 'name',
    optionValue: 'id',
    record: {},
    required: false,
    hideLabel: false,
    hidden: false,
    readOnly: false
};

export default MySelectArrayInput;
