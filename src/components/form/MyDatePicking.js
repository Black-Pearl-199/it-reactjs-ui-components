import React, { useEffect, useState } from 'react';
import { useTranslate } from 'react-admin';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { MyBootstrapInput } from './MyBootstrapInput';

function add(date, day) {
    const newDate = new Date();
    newDate.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    return newDate;
}

export const DATE_RANGE = {
    ALL: 'all',
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_WEEK: 'last_week',
    OTHER: 'other',
    THIS_WEEK: 'this_week',
    THIS_MONTH: 'this_month',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    NEXT_WEEK: 'next_week'
};

export const MyDatePicking = (props) => {
    const translate = useTranslate();

    const {
        groupClasses,
        labelClasses,
        buttonClasses,
        inputGroupClasses,
        inputClasses,
        hideInputLabel,
        endDateName,
        dateButtons,
        label,
        hideLabel,
        alwaysShowInput,
        submit,
        autoSubmit,
        disabled,
        hideButton,
        inputLabel,
        startDateName,
        formatDate,
        ...rest
    } = props;
    const [currentActive, setCurrentActive] = useState(DATE_RANGE.OTHER);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        let todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        let todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const { inputValue } = props;
        if (inputValue) {
            const startDate = inputValue[startDateName];
            const endDate = inputValue[endDateName];
            if (!startDate && !endDate) {
                setCurrentActive(DATE_RANGE.ALL);
            } else if (!startDate || !endDate) {
                setCurrentActive(DATE_RANGE.OTHER);
            } else {
                if (formatDate) {
                    todayStart = moment(
                        moment(todayStart).format(formatDate)
                    ).toDate();
                    todayEnd = moment(
                        moment(todayEnd).format(formatDate)
                    ).toDate();
                }
                const start = moment(startDate).toDate();
                const end = moment(endDate).toDate();
                const lastWeekStart = moment(add(todayStart, -7))
                    .startOf('isoWeek')
                    .toDate();
                if (
                    start.getTime() === todayStart.getTime() &&
                    end.getTime() === todayEnd.getTime()
                ) {
                    setCurrentActive(DATE_RANGE.TODAY);
                } else if (
                    start.getTime() + 86400000 === todayStart.getTime() &&
                    end.getTime() + 86400000 === todayEnd.getTime()
                ) {
                    setCurrentActive(DATE_RANGE.YESTERDAY);
                } else if (
                    start.getTime() === lastWeekStart.getTime() &&
                    lastWeekStart.getTime() + 86400000 * 7 === end.getTime()
                ) {
                    setCurrentActive(DATE_RANGE.LAST_WEEK);
                } else setCurrentActive(DATE_RANGE.OTHER);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeInput = (newInputValues) => {
        let startDate = newInputValues[startDateName];
        let endDate = newInputValues[endDateName];
        if (formatDate) {
            const isFunction = typeof formatDate === 'function';
            if (startDate) startDate = isFunction ? formatDate(startDate) : moment(startDate).format(formatDate);
            if (endDate) endDate = isFunction ? formatDate(endDate) : moment(endDate).format(formatDate);
        }
        props.onInputChange({
            ...newInputValues,
            [startDateName]: startDate,
            [endDateName]: endDate
        }, autoSubmit && submit);
    };

    const selectDateRange = (e) => {
        const selectType = e.currentTarget.dataset['selectType'];
        const todayStart = new Date();
        const todayEnd = new Date();
        todayStart.setHours(0, 0, 0, 0);
        todayEnd.setHours(23, 59, 59, 999);
        // console.log(todayStart, todayEnd);
        switch (selectType) {
            case DATE_RANGE.TODAY:
                changeInput({
                    [startDateName]: todayStart,
                    [endDateName]: todayEnd
                });
                break;
            case DATE_RANGE.YESTERDAY:
                changeInput({
                    [startDateName]: add(todayStart, -1),
                    [endDateName]: add(todayEnd, -1)
                });
                break;
            case DATE_RANGE.LAST_WEEK:
                const lastWeekStart = moment(add(todayStart, -7))
                    .startOf('isoWeek')
                    .toDate();
                changeInput({
                    [startDateName]: lastWeekStart,
                    [endDateName]: add(lastWeekStart, 7)
                });
                // setState({ weekStart: lastWeekStart });
                break;
            case DATE_RANGE.ALL:
                changeInput({
                    [startDateName]: undefined,
                    [endDateName]: undefined
                });
                break;
            case DATE_RANGE.THIS_WEEK:
                const thisWeekStart = moment(todayStart)
                    .startOf('isoWeek')
                    .toDate();
                changeInput({
                    [startDateName]: thisWeekStart,
                    [endDateName]: add(thisWeekStart, 7)
                });
                // setState({ weekStart: thisWeekStart });
                break;
            case DATE_RANGE.NEXT_WEEK:
                const nextWeekStart = moment(add(todayStart, 7))
                    .startOf('isoWeek')
                    .toDate();
                changeInput({
                    [startDateName]: moment(nextWeekStart)
                        .startOf('isoWeek')
                        .toDate(),
                    [endDateName]: add(nextWeekStart, 7)
                });
                // setState({ weekStart: nextWeekStart });
                break;
            case DATE_RANGE.THIS_MONTH:
                changeInput({
                    [startDateName]: moment(todayEnd)
                        .startOf('month')
                        .toDate(),
                    [endDateName]: todayEnd
                });
                break;
            default:
                break;
        }
        setCurrentActive(selectType);
        setShowInput(selectType === DATE_RANGE.OTHER);
    };


    return (
        <div className={groupClasses}>
            {!hideLabel && (
                <label className={classNames('col-form-label', labelClasses)}>
                    {translate(label)}
                </label>
            )}
            {!hideButton && (
                <div
                    className={buttonClasses}
                    role="group"
                    aria-label="Select study date range"
                >
                    {dateButtons.map((button) => (
                        <Button
                            key={button}
                            variant="pick-date"
                            size="sm"
                            disabled={disabled}
                            className={classNames(
                                'btn-itech-secondary',
                                currentActive === button ? 'active' : ''
                            )}
                            onClick={selectDateRange}
                            data-select-type={button}
                            type="button"
                        >
                            {translate(`time_range.${button}`)}
                        </Button>
                    ))}
                </div>
            )}
            <div
                className={classNames(
                    alwaysShowInput || showInput
                        ? inputGroupClasses
                        : 'd-none'
                )}
            >
                <MyBootstrapInput
                    source={startDateName}
                    component="date"
                    hideLabel={hideInputLabel}
                    groupClasses="col-sm-6"
                    label={inputLabel.startDate}
                    area-describedby="addon-from-date"
                    {...rest}
                    {...inputClasses}
                    readOnly={disabled}
                />
                <MyBootstrapInput
                    source={endDateName}
                    component="date"
                    hideLabel={hideInputLabel}
                    groupClasses="col-sm-6"
                    label={inputLabel.endDate}
                    area-describedby="addon-end-date"
                    {...rest}
                    {...inputClasses}
                    readOnly={disabled}
                />
            </div>
        </div>
    );
};

MyDatePicking.propTypes = {
    startDateName: PropTypes.string,
    endDateName: PropTypes.string,
    label: PropTypes.string,
    dateButtons: PropTypes.array,
    defaultRange: PropTypes.string,
    groupClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    buttonClasses: PropTypes.string,
    inputGroupClasses: PropTypes.string,
    inputClasses: PropTypes.object,
    inputLabel: PropTypes.object,
    submit: PropTypes.func,
    autoSubmit: PropTypes.bool,
    disabled: PropTypes.bool,
    formatDate: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    alwaysShowInput: PropTypes.bool,
    hideButton: PropTypes.bool,
    hideInputLabel: PropTypes.bool,
    hideLabel: PropTypes.bool,
    inputValue: PropTypes.any,
    onInputChange: PropTypes.func
};
MyDatePicking.defaultProps = {
    startDateName: 'startDate',
    endDateName: 'endDate',
    dateButtons: [
        DATE_RANGE.TODAY,
        DATE_RANGE.YESTERDAY,
        DATE_RANGE.LAST_WEEK,
        DATE_RANGE.ALL,
        DATE_RANGE.OTHER
    ],
    defaultRange: DATE_RANGE.ALL,
    buttonClasses: 'group-btn-pick-date',
    inputGroupClasses: 'mt-2 row',
    inputClasses: {
        labelClasses: 'py-0'
    },
    alwaysShowInput: false,
    hideButton: false,
    hideInputLabel: true,
    hideLabel: false,
    inputLabel: {
        startDate: 'time_range.startDate',
        endDate: 'time_range.endDate'
    }
};
