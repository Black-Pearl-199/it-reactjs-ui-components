import { LinearProgress } from '@material-ui/core';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Children, useEffect, useState } from 'react';
import { Labeled, useReferenceInputController, useTranslate } from 'react-admin';
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
    crudGetOne,
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

const ReferenceInputView = (props) => {
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
    const { filter, perPage } = props;
    if (Children.count(children) !== 1) {
        throw new Error('<ReferenceInput> only accepts a single child');
    }

    const [firstInit, setFirstInit] = useState(!allowEmpty);
    const value = get(rest.record, source);
    const { inputValue, optionValue = 'id', onInputChange } = rest;
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
                formInitValue = formInitValue || get(choices[0], optionValue);
            }
            // console.log('init reference input with value', defaultValue, formInitValue);
            if (form) form.change(source, formInitValue || defaultValue);

            if (onChange) onChange(formInitValue || defaultValue);

            if (onInputChange) {
                // console.log('init fill data for filterbox', { [source]: formInitValue || defaultValue });
                onInputChange({ [source]: formInitValue || defaultValue });
            }
        }
    }, [firstInit, loading, source, form, choices, defaultValue, onChange, inputValue, optionValue, value, onInputChange]);

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
        filter,
        perPage,
        defaultValue: value || defaultValue,
        ...sanitizeRest
    });
};

ReferenceInputView.propTypes = {
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
    warning: PropTypes.string,
    filter: PropTypes.object,
    perPage: PropTypes.number
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
 *             <MyReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </MyReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <MyReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </MyReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <MyReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </MyReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <MyReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </MyReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <MyReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </MyReferenceInput>
 *
 * The enclosed component may filter results. MyReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <MyReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </MyReferenceInput>
 */

const MyReferenceInput = ({ format, onBlur, onChange, onFocus, parse, validate, ...props }) => {
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
    return <ReferenceInputView translate={translate} {...props} {...useReferenceInputController({ ...props, ...inputProps, translate })} />;
};

MyReferenceInput.propTypes = {
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

MyReferenceInput.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: (searchText) => {
        if (searchText !== undefined && searchText !== '') return { title: searchText };
        return {};
    },
    perPage: 25,
    sort: { field: 'id', order: SORT_DESC }
};

export default MyReferenceInput;
