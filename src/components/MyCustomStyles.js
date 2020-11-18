import variables from '../assets/scss/abstracts/_export.scss';

// style config cho các component Card/CardContainer/CardContainerInner của react-admin
export const formStyles = {
    card: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0.25rem',
        // overflowY: 'inherit',
        '&>div': {
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'block',
            paddingLeft: 15,
            paddingRight: 15,
            '&>[filters]': {
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '10px 10px 15px -20px rgba(0, 0, 0, 0.6)',
                margin: '15px 0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                wordWrap: 'break-word',
                backgroundClip: 'border-box',
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem'
            }
        },
        "& button[class*='button-add']": {
            color: variables.primaryTextColor,
            backgroundColor: variables.primaryBgDark,
            borderRadius: '1rem',
            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            marginTop: '0.25rem !important',
            '&:hover': {
                backgroundColor: variables.primaryBgDarkHover
            },
            '&:focus': {
                outline: 'none'
            }
        },
        "& button[class*='button-remove']": {
            // color: '#e9322d',
            color: variables.primaryTextColor,
            backgroundColor: '#e9322d',
            borderRadius: '1rem',
            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            '&:hover': {
                backgroundColor: '#e85656'
            },
            '&:focus': {
                outline: 'none'
            }
        },
        '& div.picker': {
            flex: '1 1 auto',
            '&>div': {
                '& label+div': {
                    margin: '0',
                    backgroundColor: 'white',
                    borderRadius: '0.25rem',
                    padding: '0',
                    '& input': {
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        borderRadius: '0.2rem'
                    }
                },
                '& div:last-child': {
                    '&:after, &:before': {
                        content: 'none'
                    }
                },
                width: '100%',
                marginTop: '0',
                border: 'solid 1px #ced4da',
                borderRadius: '0.25rem',
                '&:hover': {
                    borderColor: variables.primaryBgHoverColor
                }
            }
        },
        '& button:not(.react-datepicker__navigation):not(.btn-pick-date), & a[role=button]': {
            borderRadius: '20px',
            padding: '0.25rem 0.5rem'
        },
        '&>.simple-form>div:first-child': {
            padding: '0 !important',
            display: 'flex',
            flexWrap: 'wrap',
            // height: '100%',
            overflow: 'auto'
            // marginLeft: -15,
            // marginRight: -15
        },
        '& fieldset[filter] label': {
            // backgroundColor: 'red',
            flexBasis: '33%'
        },
        "& [role='toolbar']": {
            background: 'transparent'
        }
    }
};

export const listStylesNoActionsList = {
    content: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        borderRadius: '0.25rem',
        overflow: 'hidden !important',
        marginTop: '0 !important', // fix khi bulkButtonAction is checked
        // overflowY: 'inherit',
        '&>div': {
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'block',
            paddingLeft: 15,
            paddingRight: 15,
            '&>[filters]': {
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '10px 10px 15px -20px rgba(0, 0, 0, 0.6)',
                margin: '15px 0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                wordWrap: 'break-word',
                backgroundClip: 'border-box',
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem'
            }
        },
        "& button[class*='button-add']": {
            color: variables.primaryTextColor,
            backgroundColor: variables.primaryBgDark,
            borderRadius: '1rem',
            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            marginTop: '0.25rem !important',
            '&:hover': { backgroundColor: variables.primaryBgDarkHover },
            '&:focus': { outline: 'none' }
        },
        "& button[class*='button-remove']": {
            // color: '#e9322d',
            color: variables.primaryTextColor,
            backgroundColor: '#e9322d',
            borderRadius: '1rem',
            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            '&:hover': { backgroundColor: '#e85656' },
            '&:focus': { outline: 'none' }
        },
        '& span.MuiCheckbox-colorPrimary.Mui-checked': {
            color: 'black', // doesnt have any effect
            textColor: 'var(--text-color)'
        },
        '& div.picker': {
            flex: '1 1 auto',
            '&>div': {
                '& label+div': {
                    margin: '0',
                    backgroundColor: 'white',
                    borderRadius: '0.25rem',
                    padding: '0',
                    '& input': {
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        borderRadius: '0.2rem'
                    }
                },
                '& div:last-child': {
                    '&:after, &:before': { content: 'none' }
                },
                width: '100%',
                marginTop: '0',
                border: 'solid 1px #ced4da',
                borderRadius: '0.25rem',
                '&:hover': { borderColor: variables.primaryBgHoverColor }
            }
        },
        '& button:not(.react-datepicker__navigation):not(.btn-pick-date), & a[role=button]': {
            borderRadius: '20px',
            padding: '0rem 0.5rem'
        },
        '&>.simple-form>div:first-child': {
            padding: '0 !important',
            display: 'flex',
            flexWrap: 'wrap'
            // marginLeft: -15,
            // marginRight: -15
        },
        '& fieldset[filter] label': {
            // backgroundColor: 'red',
            flexBasis: '33%'
        },
        "& [role='toolbar']": { background: 'transparent' }
    }
};

export const paginationStyles = {
    pagination: {
        display: 'flex',
        '& button': {
            marginRight: '0.25rem',
            position: 'relative',
            border: '1px solid #455F6D',
            minWidth: `${variables.paginationBtnWidth} !important`,
            minHeight: `${variables.paginationBtnHeight} !important`,
            width: `${variables.paginationBtnWidth} !important`,
            height: `${variables.paginationBtnHeight} !important`,
            lineHeight: variables.paginationBtnHeight,
            textAlign: 'center',
            padding: '0 !important',
            fontSize: '1rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)',
            // color: "#455F6D",
            borderColor: '#dee2e6',
            borderRadius: '.25rem',
            '&:hover': {
                color: '#ffffff',
                backgroundColor: '#455F6D',
                background: 'none'
            },
            '&:focus': { outline: 'none' }
        },
        '& ul span': { padding: '0 1rem 0 0.75rem' },
        '&>div': {
            height: 'auto',
            minHeight: 'auto'
        }
    }
};

export const buttonStyles = {
    button: {
        backgroundColor: `${variables.primaryBgColor} !important`,
        color: `${variables.primaryTextColor} !important`,
        borderRadius: '0.25rem !important',
        '&:hover': {
            backgroundColor: `${variables.primaryBgHoverColor}!important`,
            color: variables.primaryTextColor
        },
        '&:disabled': {
            color: '#fff',
            backgroundColor: '#6c757d',
            borderColor: '#6c757d',
            cursor: 'not-allowed',
            opacity: '0.65'
        },
        '&[class*=Button-floating][class*=Button-fab]': {
            borderRadius: '50% !important'
        }
    }
};

export const buttonGreenStyles = {
    button: {
        backgroundColor: `${variables.primaryBgDark} !important`,
        color: `${variables.primaryTextColor} !important`,
        minHeight: 34,
        minWidth: 129,
        borderRadius: '20px !important',
        '&:hover': {
            backgroundColor: `${variables.primaryBgDarkHover}!important`,
            color: variables.primaryTextColor
        },
        '&:disabled': {
            color: '#fff',
            backgroundColor: '#6c757d',
            borderColor: '#6c757d',
            cursor: 'not-allowed',
            opacity: '0.65'
        },
        '&[class*=Button-floating][class*=Button-fab]': {
            borderRadius: '50% !important'
        }
    }
};

export const toolbarStyles = {
    // toolbar: {
    //     color: variables.primaryBgColor
    // }
};

export const inputFormControlStyles = {
    margin: '0',
    backgroundColor: 'white',
    border: 'solid 1px #ced4da',
    borderRadius: '0.25rem',
    padding: '0',
    // "&:hover": {
    //     borderColor: variables.primaryBgHoverColor
    // },
    '& input': {
        padding: '0.375rem 0.75rem',
        lineHeight: '1.5',
        height: 'calc(1.25rem + 2px)'
    }
};

export const filterStyles = {
    button: {},
    form: {
        width: '100%',
        '& div[data-source^=row]': { width: '100%' },
        // fontSize: "14px",
        // "& .btn": {
        //     fontSize: "14px"
        // },
        '& div.filter-field': {
            '& > div:last-child': { width: '0 !important' }
        }
    }
};

export const tableStyles = {
    root: {
        '& .MuiTableRow-root': { height: '27px !important' },
        '& .MuiIconButton-root ': {
            height: 'auto !important',
            width: 'auto !important'
        },
        '& td': {
            verticalAlign: 'inherit',
            whiteSpace: 'nowrap'
        },
        '& thead': {
            '& th': {
                // verticalAlign: 'inherit',
                whiteSpace: 'nowrap',
                border: '1px solid var(--main-background)',
                borderTop: '0px'
            },
            '& td': {
                fontWeight: 'bold',
                backgroundColor: variables.primaryBgDark,
                borderColor: '#dee2e6',
                border: '1px'
            },
            '$ tr': {
                height: '25px !important'
            }
        },
        '& th, & td, & tr': {
            padding: '0 .3rem !important',
            '&.column-undefined': {
                paddingTop: '0rem !important',
                paddingBottom: '0rem !important'
            },
            '& > span': {
                padding: '0',
                fontSize: '1rem'
            }
        },
        '& tbody': {
            '& tr': {
                height: '25px !important'
            }
        }
    }
};

export const myDataGridStyle = {
    root: {
        tableLayout: 'auto'
    },
    thead: {},
    tbody: {
        height: 'inherit'
    },
    headerRow: {},
    headerCell: {
        padding: '0 12px',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: 'var(--main-color) !important',
        color: 'white !important',
        '&:last-child': {
            padding: '0 12px'
        }
    },
    checkbox: { height: '100%', width: 'auto' },
    row: {
        height: 'auto',
        // "&:": {
        //     backgroundColor: variables.rowHoverColor + " !important"
        // },
        color: 'var(--text-color)',
        '&.active': {
            backgroundColor: 'var(--form-background-color-focus) !important'
            // color: "#fff"
        }
    },
    clickableRow: {
        cursor: 'pointer'
    },
    rowEven: {},
    rowOdd: {},
    rowCell: {
        padding: '0 12px',
        '&:last-child': {
            padding: '0 12px'
        }
    },
    expandHeader: {
        padding: 0,
        width: 32
    },
    expandIconCell: {
        width: 32
    },
    expandIcon: {
        //     transform: 'rotate(-90deg)',
        //     transition: theme.transitions.create('transform', {
        //         duration: theme.transitions.duration.shortest
        //     })
    },
    expanded: {
        transform: 'rotate(0deg)'
    }
};

export const inputStyles = {
    boolean: {
        '& label': {
            height: '1.5rem',
            margin: 0,
            justifyContent: 'flex-start'
        },
        '& span:last-child span': { display: 'none' }
    }
};

export const checkboxStyles = {
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    icon: {
        // borderRadius: 3,
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5'
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: '#CCCCCC'
        }
    },
    checkedIcon: {
        backgroundColor: variables.primaryBgDark,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""'
        },
        'input:hover ~ &': {
            backgroundColor: variables.primaryBgDark
        }
    },
    checkbox: {
        height: 20,
        width: 20
    }
};

export default {
    formStyles,
    listStylesNoActionsList,
    paginationStyles,
    buttonStyles,
    buttonGreenStyles,
    inputFormControlStyles,
    filterStyles,
    tableStyles,
    inputStyles,
    checkboxStyles
};
