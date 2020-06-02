import button from './button';
import commons from './commons';
import crud from './crud';
import msgBox from './msgBox';

export default {
    // ...defaultMessages,
    ...crud,
    language: {
        name: 'English'
    },
    commons,
    msgBox,
    button,
    label: {
        image: 'image',
        images: 'images'
    },
    time_range: {
        today: 'Today',
        yesterday: 'Yesterday',
        last_week: 'Last week',
        all: 'All time',
        other: 'Other',
        this_week: 'This week',
        this_month: 'This month',
        last_month: 'Last month',
        hour: 'hour(s)',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        startDate: 'Start date',
        endDate: 'End date'
    },
    deleteReason: 'Reasons for delete',
    'no-access': 'You don\'t have permissions to access this page. Please go back or contact Administrators!',
    'Username/Password invalid': 'Username or password is not correct. Please try again.',
    '': ''
};
