import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useTranslate, useDataProvider } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import PagingRefInput from './PagingRefInput';
import { useOnClickOutside } from '../../configurations/hooks';

export const OPTION_INPUT = {
    FILTER_BOX: 'FILTER_BOX',
    SIMPLE_FORM: 'SIMPLE_FORM'
};

const zIndex100 = { zIndex: 100 };

const listScrollStyle = { maxHeight: '230px', overflowY: 'auto' };

const useStyles = makeStyles({
    modalSelect: {
        minWidth: '200px',
        maxWidth: '400px',
        backgroundColor: 'var(--form-background-color)'
    },
    list: {
        height: '22px',
        fontSize: '14px',
        lineHeight: 1,
        backgroundColor: 'var(--form-background-color)',
        '&:hover': {
            color: 'var(--text-color)',
            textDecoration: 'none',
            backgroundColor: '#007bff'
        }
    },
    pagination: {
        backgroundColor: 'white'
    }
});

const SelectReferenceInput = (props) => {
    const ref = useRef();
    const dataProvider = useDataProvider();
    const [show, setShow] = useState(false);
    const {
        filter,
        setPagination,
        perPage,
        inputValue,
        choices,
        allowEmpty,
        translateChoice,
        optionText,
        optionValue,
        source,
        reference,
        resource,
        labelClasses,
        groupClasses,
        inputClasses,
        hideLabel,
        label,
        component,
        formRef,
        defaultValue,
        emptyChoiceLabel,
        required,
        readOnly
    } = props;
    const translate = useTranslate();
    const classes = useStyles();
    const [textInput, setTextInput] = useState('');
    const [valueInput, setValueInput] = useState();

    const handleSelectItem = useCallback((event) => {
        const { value, text } = event.currentTarget.dataset;
        setTextInput(text);
        setValueInput(value);
        if (formRef && formRef.current) {
            if (component === OPTION_INPUT.SIMPLE_FORM) {
                formRef.current.change(source, value);
            } else {
                formRef.current.onChange({ [source]: value });
            }
        }
        setShow(false);
    }, [component, formRef, source]);

    const handleShowSelect = useCallback(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        const tempInputValue = component === OPTION_INPUT.SIMPLE_FORM ? defaultValue : inputValue && inputValue[source];
        const getTextInput = async (id) => {
            const { prefix, postfix } = filter;
            await dataProvider.getOne(reference, { id, filter: { prefix, postfix } })
                .then((response) => {
                    if (response && response.data) {
                        setTextInput(response.data[optionText]);
                    } else {
                        setTextInput(tempInputValue);
                    }
                })
                .catch((error) => {
                    setTextInput(tempInputValue);
                });
        };
        // check neu co input value => call api de get text display khi ma trong choice chua co
        if (tempInputValue !== undefined) {
            setValueInput(tempInputValue);
            getTextInput(tempInputValue);
        } else if (allowEmpty) {
            setValueInput('');
            setTextInput(emptyChoiceLabel && translate(emptyChoiceLabel));
        } else if (!allowEmpty && choices.length > 0) {
            setValueInput(choices[0][optionValue]);
            setTextInput(choices[0][optionText]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickOutsideCallback = useCallback(() => {
        setShow(false);
    }, []);

    useOnClickOutside(ref, clickOutsideCallback);

    const onChange = useCallback(() => {
        // do nothing
    }, []);

    const labelTextShow = label ? translate(label) : translate(`resources.${resource}.fields.${source}`);

    return (
        <>
            <div className={classnames(groupClasses)}>
                {!hideLabel && <label className={classnames('col-form-label', labelClasses, required ? 'label-required' : '')}>{labelTextShow}</label>}
                <div ref={ref} className={inputClasses}>
                    <input
                        disabled={readOnly || show}
                        onChange={onChange}
                        value={textInput}
                        className={classnames('form-control form-control-sm w-100')}
                        source={source}
                        onClick={handleShowSelect}
                    />
                    <div
                        className={classnames(classes.modalSelect, 'w-100 position-absolute', show ? 'd-block shadow' : 'd-none')}
                        style={zIndex100}
                    >
                        <ul style={listScrollStyle} className="bg-white border rounded inline-block ul-0 w-100 px-0 mb-0">
                            {allowEmpty && (
                                <div key={`${reference}-${source}-all`} className={classes.list}>
                                    <Dropdown.Item
                                        role="div" // remove css from form for role="button"
                                        className={classes.list}
                                        onClick={handleSelectItem}
                                        data-value=""
                                        data-text={emptyChoiceLabel && translate(emptyChoiceLabel)}
                                    >
                                        {emptyChoiceLabel && translate(emptyChoiceLabel)}
                                    </Dropdown.Item>
                                </div>
                            )}
                            {choices.map((choice) => {
                                const showText = translateChoice ? translate(choice[optionText]) : choice[optionText];
                                return (
                                    <div key={`${reference}-${source}-${choice[optionValue]}`} className={classes.list}>
                                        <Dropdown.Item
                                            role="div" // remove css from form fro role="button"
                                            className={classes.list}
                                            onClick={handleSelectItem}
                                            data-value={choice[optionValue]}
                                            data-text={choice[optionText]}
                                            active={valueInput && choice[optionValue] && valueInput === choice[optionValue].toString()}
                                        >
                                            {showText}
                                        </Dropdown.Item>
                                    </div>
                                );
                            })}
                        </ul>
                        <div className={classes.pagination}>
                            <PagingRefInput
                                setPagination={setPagination}
                                perPage={perPage}
                                reference={reference}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

SelectReferenceInput.propTypes = {
    perPage: PropTypes.number, // from reference input
    choices: PropTypes.array,
    optionValue: PropTypes.string,
    optionText: PropTypes.string,
    translateChoice: PropTypes.bool,
    source: PropTypes.string,
    resource: PropTypes.string, // curernt resource page
    reference: PropTypes.string, // resource reference
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    labelClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    groupClasses: PropTypes.string,
    setPagination: PropTypes.func, // from reference input
    component: PropTypes.string, // to check component in filterbox or simpleform
    formRef: PropTypes.object.isRequired, // from filterbox or mysimpleform
    inputValue: PropTypes.object,
    filter: PropTypes.object, // from reference input
    allowEmpty: PropTypes.bool,
    defaultValue: PropTypes.any, // from reference input when component = simpleform
    emptyChoiceLabel: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool
};

SelectReferenceInput.defaultProps = {
    perPage: 10,
    translateChoice: false,
    optionValue: 'id',
    optionText: 'name',
    hideLabel: false,
    component: OPTION_INPUT.SIMPLE_FORM,
    choices: []
};

export default SelectReferenceInput;
