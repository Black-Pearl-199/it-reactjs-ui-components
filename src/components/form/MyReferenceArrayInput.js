import { LinearProgress } from '@material-ui/core';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Children, useEffect, useState } from 'react';
import { Labeled, useReferenceArrayInputController, useTranslate } from 'react-admin';
import ReferenceError from './ReferenceError';

const SORT_ASC = 'ASC';
const SORT_DESC = 'DESC';

const sanitizeRestProps = ({
    allowEmpty,
    basePath,
    choices,
    className,
    component,
    crudGetMatching,
    crudGetMany,
    defaultValue,
    filter,
    filterToQuery,
    formClassName,
    initializeForm,
    input,
    isRequired,
    label,
    locale,
    meta,
    onChange,
    optionValue,
    optionText,
    perPage,
    record,
    reference,
    referenceSource,
    resource,
    setFilter,
    setPagination,
    setSort,
    sort,
    source,
    textAlign,
    translate,
    translateChoice,
    validation,
    //    change,
    ...rest
}) => rest;

const ReferenceArrayInputView = (props) => {
    const {
        allowEmpty,
        basePath,
        children,
        choices,
        classes,
        className,
        error,
        helperText,
        id,
        input,
        isRequired,
        loading,
        label,
        meta,
        resource,
        setFilter,
        setPagination,
        setSort,
        source,
        warning,
        defaultValue,
        onChange,
        form,
        ...rest
    } = props;
    if (Children.count(children) !== 1) {
        throw new Error('<ReferenceArrayInput> only accepts a single child');
    }

    const [firstInit, setFirstInit] = useState(!allowEmpty);
    const value = get(rest.record, source);
    const { inputValue, optionValue = 'id' } = rest;
    useEffect(() => {
        if (firstInit && !loading) {
            setFirstInit(false);
            // console.log(choices, source, rest.optionValue);
            let formInitValue = value;
            if (!formInitValue) {
                // check form data của MyFilterBox
                if (inputValue) {
                    formInitValue = get(inputValue, source);
                }
                if (!formInitValue) {
                    formInitValue = formInitValue || [get(choices[0], optionValue)];
                }
            }
            // console.log('init reference input with value', defaultValue, formInitValue);
            if (form) form.change(source, formInitValue || defaultValue);

            if (onChange) onChange(formInitValue || defaultValue);

            if (rest.onInputChange) {
                // console.log('init fill data for filterbox', { [source]: formInitValue || defaultValue });
                rest.onInputChange({ [source]: formInitValue || defaultValue });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstInit, loading, source, form, choices, defaultValue, onChange, inputValue, optionValue, value]);

    if (loading) {
        return (
            <Labeled label={label} source={source} resource={resource} className={className} isRequired={isRequired}>
                <LinearProgress />
            </Labeled>
        );
    }

    if (error) {
        return <ReferenceError label={label} error={error} />;
    }

    const finalMeta = warning
        ? {
            ...meta,
            error: warning
        }
        : meta;

    const sanitizeRest = sanitizeRestProps(rest);
    return React.cloneElement(children, {
        allowEmpty,
        classes,
        className,
        input,
        isRequired,
        label,
        resource,
        meta: finalMeta,
        source,
        choices,
        basePath,
        setFilter,
        setPagination,
        setSort,
        translateChoice: false,
        ...sanitizeRest
    });
};

ReferenceArrayInputView.propTypes = {
    allowEmpty: PropTypes.bool,
    basePath: PropTypes.string,
    children: PropTypes.element,
    choices: PropTypes.array,
    classes: PropTypes.object,
    className: PropTypes.string,
    error: PropTypes.string,
    input: PropTypes.object,
    loading: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    resource: PropTypes.string.isRequired,
    setFilter: PropTypes.func,
    setPagination: PropTypes.func,
    setSort: PropTypes.func,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    warning: PropTypes.string
};

/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <MyReferenceArrayInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </MyReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <MyReferenceArrayInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </MyReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <MyReferenceArrayInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </MyReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <MyReferenceArrayInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </MyReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <MyReferenceArrayInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </MyReferenceArrayInput>
 *
 * The enclosed component may filter results. MyReferenceArrayInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <MyReferenceArrayInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </MyReferenceArrayInput>
 */

const MyReferenceArrayInput = ({ format, onBlur, onChange, onFocus, parse, validate, ...props }) => {
    const translate = useTranslate();
    const inputProps = { input: props.input || {} };
    // if (props.form) {
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     inputProps = useInput({
    //         format,
    //         onBlur,
    //         onChange,
    //         onFocus,
    //         parse,
    //         validate,
    //         ...props
    //     });
    //     console.log('final form props for reference input', inputProps);
    // }
    return (
        <ReferenceArrayInputView
            translate={translate}
            {...props}
            {...useReferenceArrayInputController({ ...props, ...inputProps, translate })}
        />
    );
};

MyReferenceArrayInput.propTypes = {
    allowEmpty: PropTypes.bool.isRequired,
    basePath: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    filter: PropTypes.object,
    filterToQuery: PropTypes.func.isRequired,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    onChange: PropTypes.func,
    perPage: PropTypes.number,
    record: PropTypes.object,
    reference: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf([SORT_ASC, SORT_DESC])
    }),
    source: PropTypes.string,
    format: PropTypes.any,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    parse: PropTypes.any,
    validate: PropTypes.any
};

MyReferenceArrayInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: (searchText) => {
        if (searchText !== undefined && searchText !== '') return { title: searchText };
        return {};
    },
    perPage: 25,
    sort: { field: 'id', order: SORT_DESC }
};

export default MyReferenceArrayInput;
