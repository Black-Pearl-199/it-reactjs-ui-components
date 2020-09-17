import classNames from 'classnames';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslate } from 'react-admin';
import { Button } from 'react-bootstrap';

import DATE_RANGE from './DateRange';
import MyBootstrapInput from './MyBootstrapInput';

const MINISECOND_IN_A_DAY = 86400000;

function add(date, day) {
    const newDate = new Date();
    newDate.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    return newDate;
}

const MyDatePicking = (props) => {
    const translate = useTranslate();
    const [openStartDateCalendar, setOpenStartDateCalendar] = useState(false);
    const [openEndDateCalendar, setOpenEndDateCalendar] = useState(false);

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
        handleOnBlur,
        ...rest
    } = props;
    const [currentActive, setCurrentActive] = useState(DATE_RANGE.OTHER);
    const [disableInputDate, setDisbleInputDate] = useState(true);
    const [showInput, setShowInput] = useState(false);

    const { inputValue } = props;

    useEffect(() => {
        let todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        let todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const thisMonthStart = moment(todayStart).startOf('month').toDate();
        const lastMonthStart = moment(add(thisMonthStart, -2)).startOf('month').toDate();
        const lastMonthEnd = moment(add(thisMonthStart, -1)).toDate();
        const thisWeekStart = moment(todayStart).startOf('isoWeek').toDate();
        const lastWeekStart = moment(add(todayStart, -7)).startOf('isoWeek').toDate();
        if (inputValue) {
            const startDate = inputValue[startDateName];
            const endDate = inputValue[endDateName];
            if (!startDate && !endDate) {
                setCurrentActive(DATE_RANGE.ALL);
            } else if (!startDate || !endDate) {
                setCurrentActive(DATE_RANGE.OTHER);
                setDisbleInputDate(false);
            } else {
                if (formatDate) {
                    todayStart = moment(moment(todayStart).format(formatDate)).toDate();
                    todayEnd = moment(moment(todayEnd).format(formatDate)).toDate();
                }
                const start = moment(startDate).toDate();
                const end = moment(endDate).toDate();
                if (start.getTime() === todayStart.getTime() && end.getTime() === todayEnd.getTime()) {
                    setCurrentActive(DATE_RANGE.TODAY);
                } else if (start.getTime() + MINISECOND_IN_A_DAY === todayStart.getTime() && end.getTime() + MINISECOND_IN_A_DAY === todayEnd.getTime()) {
                    setCurrentActive(DATE_RANGE.YESTERDAY);
                } else if (start.getTime() === thisWeekStart.getTime() && dateButtons.indexOf(DATE_RANGE.THIS_WEEK)) {
                    setCurrentActive(DATE_RANGE.THIS_WEEK);
                } else if (
                    start.getTime() === lastWeekStart.getTime()
                    && lastWeekStart.getTime() + MINISECOND_IN_A_DAY * 7 === end.getTime()
                    && dateButtons.indexOf(DATE_RANGE.LAST_WEEK)
                ) {
                    setCurrentActive(DATE_RANGE.LAST_WEEK);
                } else if (start.getTime() === thisMonthStart.getTime() && end.getTime() === todayEnd.getTime() && dateButtons.indexOf(DATE_RANGE.THIS_MONTH)) {
                    setCurrentActive(DATE_RANGE.THIS_MONTH);
                } else if (start.getTime() === lastMonthStart.getTime() && end.getTime() === lastMonthEnd.getTime()) {
                    setCurrentActive(DATE_RANGE.LAST_MONTH);
                } else setCurrentActive(DATE_RANGE.OTHER);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeInput = useCallback((newInputValues) => {
        let startDate = newInputValues[startDateName];
        let endDate = newInputValues[endDateName];
        if (formatDate) {
            const isFunction = typeof formatDate === 'function';
            if (startDate) startDate = isFunction ? formatDate(startDate) : moment(startDate).format(formatDate);
            if (endDate) endDate = isFunction ? formatDate(endDate) : moment(endDate).format(formatDate);
        }
        props.onInputChange(
            {
                ...newInputValues,
                [startDateName]: startDate,
                [endDateName]: endDate
            },
            autoSubmit && submit
        );
    }, [autoSubmit, endDateName, formatDate, props, startDateName, submit]);

    const selectDateRange = useCallback((e) => {
        const { selectType } = e.currentTarget.dataset;
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
                const lastWeekStart = moment(add(todayStart, -7)).startOf('isoWeek').toDate();
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
                const thisWeekStart = moment(todayStart).startOf('isoWeek').toDate();
                changeInput({
                    [startDateName]: thisWeekStart,
                    [endDateName]: add(thisWeekStart, 7)
                });
                // setState({ weekStart: thisWeekStart });
                break;
            case DATE_RANGE.NEXT_WEEK:
                const nextWeekStart = moment(add(todayStart, 7)).startOf('isoWeek').toDate();
                changeInput({
                    [startDateName]: moment(nextWeekStart).startOf('isoWeek').toDate(),
                    [endDateName]: add(nextWeekStart, 7)
                });
                // setState({ weekStart: nextWeekStart });
                break;
            case DATE_RANGE.THIS_MONTH:
                changeInput({
                    [startDateName]: moment(todayEnd).startOf('month').toDate(),
                    [endDateName]: todayEnd
                });
                break;
            case DATE_RANGE.LAST_MONTH:
                const thisMonthStart = moment(todayStart).startOf('month').toDate();
                const lastMonthStart = moment(add(thisMonthStart, -2)).startOf('month').toDate();
                const lastMonthEnd = moment(add(thisMonthStart, -1)).toDate();
                changeInput({
                    [startDateName]: lastMonthStart,
                    [endDateName]: lastMonthEnd
                });
                break;
            default:
                setOpenStartDateCalendar(true);
                break;
        }
        setCurrentActive(selectType);
        setShowInput(selectType === DATE_RANGE.OTHER);
        setDisbleInputDate(selectType !== DATE_RANGE.OTHER);
        setOpenEndDateCalendar(false);
    }, [changeInput, endDateName, startDateName]);

    const calendarOfStartDateClose = useCallback(() => {
        setOpenEndDateCalendar(true);
        setOpenStartDateCalendar(false);
    }, []);

    const calendarOfEndDateClose = useCallback(() => {
        setOpenEndDateCalendar(false);
    }, []);

    return (
        <div className={groupClasses}>
            {!hideLabel && <label className={classNames('col-form-label', labelClasses)}>{translate(label)}</label>}
            {!hideButton && (
                <div className={buttonClasses} role="group" aria-label="Select study date range">
                    {dateButtons.map((button) => (
                        <Button
                            key={button}
                            variant="pick-date"
                            size="sm"
                            disabled={disabled}
                            className={classNames('btn-itech-secondary', currentActive === button ? 'active' : '')}
                            onClick={selectDateRange}
                            data-select-type={button}
                            type="button"
                        >
                            {translate(`time_range.${button}`)}
                        </Button>
                    ))}
                </div>
            )}
            <div className={classNames(alwaysShowInput || showInput ? inputGroupClasses : 'd-none')}>
                <MyBootstrapInput
                    source={startDateName}
                    component="date"
                    hideLabel={hideInputLabel}
                    groupClasses="col-sm-6"
                    label={inputLabel.startDate}
                    area-describedby="addon-from-date"
                    {...rest}
                    {...inputClasses}
                    readOnly={disabled || disableInputDate}
                    formatDate={formatDate}
                    openCalendar={openStartDateCalendar}
                    onCalendarClose={calendarOfStartDateClose}
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
                    readOnly={disabled || disableInputDate}
                    formatDate={formatDate}
                    openCalendar={openEndDateCalendar}
                    onCalendarClose={calendarOfEndDateClose}
                    onBlur={handleOnBlur}
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
    onInputChange: PropTypes.func,
    handleOnBlur: PropTypes.func
};
MyDatePicking.defaultProps = {
    startDateName: 'startDate',
    endDateName: 'endDate',
    dateButtons: [DATE_RANGE.TODAY, DATE_RANGE.YESTERDAY, DATE_RANGE.LAST_WEEK, DATE_RANGE.ALL, DATE_RANGE.OTHER],
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

export default MyDatePicking;
