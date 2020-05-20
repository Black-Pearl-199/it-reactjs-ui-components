import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { useInput } from 'react-admin';
import React, { useCallback } from 'react';
import MyCheckboxGroupInputItem from './MyCheckboxGroupInputItem';

// const defaultSanitizeRestProps = ({
//     allowEmpty,
//     alwaysOn,
//     basePath,
//     component,
//     defaultValue,
//     formClassName,
//     initialValue,
//     initializeForm,
//     input,
//     isRequired,
//     label,
//     limitChoicesToValue,
//     locale,
//     meta,
//     options,
//     optionText,
//     optionValue,
//     record,
//     resource,
//     source,
//     textAlign,
//     translate,
//     translateChoice,
//     ...rest
// }) => rest;

// const sanitizeRestProps = ({
//     setFilter,
//     setPagination,
//     setSort,
//     loaded,
//     ...rest
// }) => defaultSanitizeRestProps(rest);

// const useStyles = makeStyles(
//     theme => ({
//         root: {},
//         label: {
//             transform: 'translate(0, 8px) scale(0.75)',
//             transformOrigin: `top ${
//                 theme.direction === 'ltr' ? 'left' : 'right'
//             }`,
//         },
//     }),
//     { name: 'RaCheckboxGroupInput' }
// );

/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.category.programming' },
 *    { id: 'lifestyle', name: 'myroot.category.lifestyle' },
 *    { id: 'photography', name: 'myroot.category.photography' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <CheckboxGroupInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <Checkbox> components
 */
const MyCheckboxGroupInput = (props) => {
    const {
        choices = [],
        classes: classesOverride,
        format,
        helperText,
        label,
        // margin = 'dense',
        onBlur,
        onChange,
        onFocus,
        optionText,
        optionValue,
        options,
        parse,
        resource,
        row,
        source,
        translate,
        translateChoice,
        validate,
        required,
        hideLabel,
        labelClasses,
        inputClasses,
        groupClasses,
        hidden,
        record,
        ...rest
    } = props;
    // const classes = useStyles(props);
    // console.log('record', record);

    const {
        id,
        input: { onChange: finalFormOnChange, onBlur: finalFormOnBlur, value }
        // meta: { error, touched },
    } = useInput({
        format,
        onBlur,
        onChange,
        onFocus,
        parse,
        resource,
        source,
        validate,
        ...rest
    });

    // console.log('value', value);

    const labelDisplay = translate(label || `resources.${resource}.fields.${source}`);

    const handleCheck = useCallback(
        (event, isChecked) => {
            let newValue;
            try {
                // try to convert string value to number, e.g. '123'
                newValue = JSON.parse(event.target.value);
            } catch (e) {
                // impossible to convert value, e.g. 'abc'
                newValue = event.target.value;
            }
            if (isChecked) {
                finalFormOnChange([...(value || []), ...[newValue]]);
            } else {
                finalFormOnChange(value.filter((v) => v != newValue)); // eslint-disable-line eqeqeq
            }
            finalFormOnBlur(); // HACK: See https://github.com/final-form/react-final-form/issues/365#issuecomment-515045503
        },
        [finalFormOnChange, finalFormOnBlur, value]
    );

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
            <div className={inputClasses}>
                {choices.map((choice) => (
                    <MyCheckboxGroupInputItem
                        key={get(choice, optionValue)}
                        choice={choice}
                        id={id}
                        disabled={props.readOnly}
                        onChange={handleCheck}
                        options={options}
                        optionText={optionText}
                        optionValue={optionValue}
                        translateChoice={translateChoice}
                        value={value}
                    />
                ))}
            </div>
        </div>
    );
};

MyCheckboxGroupInput.propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element
    ]),
    optionValue: PropTypes.string,
    row: PropTypes.bool,
    resource: PropTypes.string,
    translateChoice: PropTypes.bool,
    hidden: PropTypes.bool,
    groupClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    translate: PropTypes.func.isRequired,
    hideLabel: PropTypes.bool,
    required: PropTypes.bool,
    record: PropTypes.object,
    fullWidth: PropTypes.bool,
    readOnly: PropTypes.bool,
    format: PropTypes.string,
    helperText: PropTypes.any,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    parse: PropTypes.any,
    validate: PropTypes.func
};

MyCheckboxGroupInput.defaultProps = {
    options: {},
    optionText: 'name',
    optionValue: 'id',
    translateChoice: true,
    fullWidth: true,
    row: true,
    hideLabel: false,
    hidden: false,
    record: {}
};

export default MyCheckboxGroupInput;
