import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormWithRedirect, CardContentInner, FormInput, Toolbar } from 'react-admin';
import React, { Children, useEffect } from 'react';

const sanitizeRestProps = ({
    anyTouched,
    array,
    asyncBlurFields,
    asyncValidate,
    asyncValidating,
    autofill,
    blur,
    change,
    clearAsyncError,
    clearFields,
    clearSubmit,
    clearSubmitErrors,
    destroy,
    dirty,
    dirtyFields,
    dirtyFieldsSinceLastSubmit,
    dirtySinceLastSubmit,
    dispatch,
    form,
    handleSubmit,
    hasSubmitErrors,
    hasValidationErrors,
    initialize,
    initialized,
    initialValues,
    pristine,
    pure,
    redirect,
    reset,
    resetSection,
    save,
    setRedirect,
    submit,
    submitError,
    submitErrors,
    submitAsSideEffect,
    submitFailed,
    submitSucceeded,
    submitting,
    touch,
    translate,
    triggerSubmit,
    undoable,
    untouch,
    valid,
    validate,
    validating,
    ...props
}) => props;

/**
 * Form with a one column layout, one input per line.
 *
 * Pass input components as children.
 *
 * @example
 *
 * import React from 'react';
 * import { Create, Edit, MySimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
 * import RichTextInput from 'ra-input-rich-text';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <MySimpleForm>
 *             <TextInput source="title" />
 *             <TextInput source="teaser" options={{ multiLine: true }} />
 *             <RichTextInput source="body" />
 *             <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
 *         </MySimpleForm>
 *     </Create>
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {ReactElement[]} children Input elements
 * @prop {Object} initialValues
 * @prop {Function} validate
 * @prop {boolean} submitOnEnter
 * @prop {string} redirect
 * @prop {ReactElement} toolbar The element displayed at the bottom of the form, contzining the SaveButton
 * @prop {string} variant Apply variant to all inputs. Possible values are 'standard', 'outlined', and 'filled' (default)
 * @prop {string} margin Apply variant to all inputs. Possible values are 'none', 'normal', and 'dense' (default)
 *
 * @param {Prop} props
 */
const MySimpleForm = (props) => (
    <FormWithRedirect
        {...props}
        render={(formProps) => <SimpleFormView {...formProps} />}
    />
);

MySimpleForm.propTypes = {
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // @deprecated
    initialValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func
    ]),
    save: PropTypes.func,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    undoable: PropTypes.bool,
    validate: PropTypes.func,
    version: PropTypes.number
};

const SimpleFormView = ({
    basePath,
    children,
    className,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    margin,
    pristine,
    record,
    redirect,
    resource,
    saving,
    submitOnEnter,
    toolbar,
    undoable,
    variant,
    setFormRef,
    ...rest
}) => {
    const { form } = rest;
    useEffect(() => {
        if (setFormRef) {
            setFormRef(form);
        }
    }, []);

    return (
        <form
            className={classnames('simple-form', className)}
            {...sanitizeRestProps(rest)}
        >
            <CardContentInner>
                {Children.map(
                    children,
                    (input) => input && (
                        <FormInput
                            basePath={basePath}
                            input={input}
                            record={record}
                            resource={resource}
                            variant={input.props.variant || variant}
                            margin={input.props.margin || margin}
                            form={form}
                        />
                    )
                )}
            </CardContentInner>
            {toolbar
            && React.cloneElement(toolbar, {
                basePath,
                handleSubmitWithRedirect,
                handleSubmit,
                invalid,
                pristine,
                record,
                redirect,
                resource,
                saving,
                submitOnEnter,
                undoable
            })}
        </form>
    );
};

SimpleFormView.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    handleSubmit: PropTypes.func, // passed by react-final-form
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func
    ]),
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    saving: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    undoable: PropTypes.bool,
    validate: PropTypes.func,
    handleSubmitWithRedirect: PropTypes.func,
    margin: PropTypes.any,
    variant: PropTypes.any,
    setFormRef: PropTypes.func
};

SimpleFormView.defaultProps = {
    submitOnEnter: true,
    toolbar: <Toolbar />
};

export default MySimpleForm;
