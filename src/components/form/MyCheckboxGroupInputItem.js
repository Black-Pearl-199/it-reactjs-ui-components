import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useChoices } from 'react-admin';
import { checkboxStyles } from '../MyCustomStyles';

const useStyles = makeStyles(checkboxStyles, { name: 'Bass-MCBGII' });

const CheckboxGroupInputItem = (props) => {
    const { classes: classesOverride, id, choice, onChange, optionText, optionValue, translateChoice, value, ...rest } = props;
    const classes = useStyles(props);
    const { getChoiceText, getChoiceValue } = useChoices({
        optionText,
        optionValue,
        translateChoice
    });

    const choiceName = getChoiceText(choice);

    return (
        <FormControlLabel
            htmlFor={`${id}_${getChoiceValue(choice)}`}
            key={getChoiceValue(choice)}
            onChange={onChange}
            control={(
                <Checkbox
                    id={`${id}_${getChoiceValue(choice)}`}
                    color="default"
                    className={classes.root}
                    checkedIcon={<span className={classNames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    checked={
                        value
                            ? value.find((v) => v === getChoiceValue(choice)) !== undefined // eslint-disable-line eqeqeq
                            : false
                    }
                    value={String(getChoiceValue(choice))}
                    {...rest}
                />
            )}
            label={choiceName}
        />
    );
};

CheckboxGroupInputItem.propTypes = {
    id: PropTypes.any,
    choice: PropTypes.object,
    onChange: PropTypes.func,
    optionText: PropTypes.string,
    optionValue: PropTypes.string,
    translateChoice: PropTypes.bool,
    value: PropTypes.any
};

export default CheckboxGroupInputItem;
