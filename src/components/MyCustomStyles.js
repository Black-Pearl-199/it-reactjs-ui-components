import variables from '../assets/scss/abstracts/_variables.scss';

// style config cho các component Card/CardContainer/CardContainerInner của react-admin
export const listStylesNoActions = {
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
            flexWrap: 'wrap'
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
        overflow: 'hidden',
        marginTop: 0, // fix khi bulkButtonAction is checked
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
            boxShadow:
                '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            marginTop: '0.25rem !important',
            '&:hover': { backgroundColor: variables.primaryBgDarkHover },
            '&:focus': { outline: 'none' }
        },
        "& button[class*='button-remove']": {
            // color: '#e9322d',
            color: variables.primaryTextColor,
            backgroundColor: '#e9322d',
            borderRadius: '1rem',
            boxShadow:
                '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
            '&:hover': { backgroundColor: '#e85656' },
            '&:focus': { outline: 'none' }
        },
        '& span.MuiCheckbox-colorPrimary.Mui-checked': {
            color: variables.primaryBgColor
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
            padding: '0.25rem 0.5rem'
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
    table: {
        '& .MuiTableRow-root': { height: '2rem ! important' },
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
                verticalAlign: 'inherit',
                whiteSpace: 'nowrap'
            },
            '& td': {
                fontWeight: 'bold',
                backgroundColor: '#e9ecef',
                borderColor: '#dee2e6'
            }
        },
        '& th, & td': {
            padding: '.3rem !important',
            '&.column-undefined': {
                paddingTop: '.1rem !important',
                paddingBottom: '.1rem !important'
            },
            '& > span': {
                padding: '0',
                fontSize: '1rem'
            }
        }
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
