export const page = {
    login: {
        label: {
            username: 'Username',
            password: 'Password',
            remember: 'Remember'
        },
        button: {
            login: 'Login',
            register: 'Register'
        },
        text: {
            formTitle: 'iPACS Operation Gateway',
            formFooter: 'Copyright © 2019 iTech Solution. All rights reserved.\nContact us: info@itechcorp.com.vn - Hotline: 024.7300.8698',
            forgetPassword: 'Do you forget password? Click here...',
            currentLogin: 'Current logged in as'
        }
    },
    study: {
        title: {
            list: 'Studies Management'
        },
        label: {
            today: 'Today',
            yesterday: 'Yesterday',
            lastWeek: 'Last week',
            all: 'All',
            source: 'Source',
            fromDate: 'From',
            toDate: 'To',
            report: 'Report',
            images: 'Image'
        }
    },
    user: {
        title: {
            list: 'Users List',
            edit: 'Edit user',
            create: 'Add user'
        },
        filter: {
            name: 'Find user on name',
            role: 'Find user on role',
            includeDisableUser: 'Include Disabled Users'
        },
        text: {
            loginInfo: 'Login Info',
            demographicInfo: 'Demographic Info'
        },
        notification: {
            duplicateUsername: 'Username already exists. Please choose the new one',
            create: {
                success: 'Add new user success',
                failure: 'Cannot add new user. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update user\'s information success',
                failure: 'Cannot update user\'s information. Please try again or contact Administrators.'
            },
            delete: {
                confirm: 'Do you sure delete user\'s information?',
                success: 'Update user\'s information success',
                failure: 'Cannot delete user\'s information. Please try again or contact Administrators.'
            },
            changePassword: {
                confirm: 'Do you sure change password?',
                success: 'Update password success',
                failure: 'Can\'t change password. Please try again or contact Administrators.'
            },
            goToCreatePage: {
                confirm: 'Create account from person %{personName}?',
                notChoosePerson: 'You don\'t choose a person yet! Please either choose a person or create a new person'
            },
            updateAvatar: {
                success: 'Update avatar success',
                failure: 'Can\'t change avatar. Please try again or contact Administrators.',
                overUpload: 'Image size is exceed for upload'
            }
        }
    },
    role: {
        title: {
            list: 'Roles List',
            edit: 'Edit role',
            create: 'Add role'
        },
        notification: {
            create: {
                duplicated: 'Id is duplicated',
                success: 'Add new role success',
                failure: 'Cannot add new role. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update role\'s information success',
                failure: 'Cannot update role\'s information. Please try again or contact Administrators.'
            },
            delete: {
                success: 'Delete role\'s information success',
                failure: 'Cannot delete role\'s information. Please try again or contact Administrators.',
                confirm: 'Do you really want to delete role\'s information?'
            }
        }
    },
    authority: {
        title: {
            list: 'Authorities List',
            edit: 'Edit Authority',
            create: 'Add Authority'
        },
        notification: {
            delete: {
                before: 'Do you want to delete for %{authorityName}?',
                success: 'Delete successful!',
                failure: 'Delete failed!'
            },
            create: {
                duplicated: 'Authority id is duplicated!'
            }
        }
    },

    clients: {
        title: {
            list: 'Clients List',
            edit: 'Edit Client',
            create: 'Add Client'
        },
        notification: {
            create: {
                duplicated: 'Client id is duplicated!',
                success: 'Add new client success',
                failure: 'Cannot add new client. Please try again or contact Administrators.'
            },
            update: {
                confirm: 'Do you sure want to update cilent\'s information?',
                success: 'Update client\'s information success',
                failure: 'Cannot update client\'s information. Please try again or contact Administrators.'
            },
            delete: {
                confirm: 'Do you sure want to delete client\'s information?',
                success: 'Delete client\'s information success',
                failure: 'Cannot delete client\'s information. Plesase try again or contact Adminstractors.'
            }
        }
    },

    persons: {
        title: {
            list: 'Persons List',
            edit: 'Edit Person',
            create: 'Add Person'
        },
        notification: {
            create: {
                success: 'Add new person success',
                failure: 'Cannot add new person. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update person\'s information success',
                failure: 'Cannot update person\'s information. Please try again or contact Administrators.'
            },
            delete: {
                confirm: 'Do you sure want to delete person\'s information?',
                success: 'Delete person\'s information success',
                failure: 'Cannot delete person\'s information. Please try again or contact Administrators.'
            }
        }
    },

    client_authorities: {
        title: {
            list: 'Authorities List',
            edit: 'Edit Authority',
            create: 'Add uthority'
        },
        notification: {
            create: {
                success: 'Add new authority success',
                failure: 'Cannot add new authority. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update authority\'s information success',
                failure: 'Cannot update authority\'s information. Please try again or contact Administrators.'
            }
        }
    },

    client_scopes: {
        title: {
            list: 'Scopes list',
            edit: 'Edit scope',
            create: 'Add scope'
        },
        notification: {
            create: {
                success: 'Add new scope success',
                failure: 'Cannot add new scope. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update scope\'s information success',
                failure: 'Cannot update scope\'s information. Please try again or contact Administrators.'
            }
        }
    },

    client_resources: {
        title: {
            list: 'Resources list',
            edit: 'Edit resource',
            create: 'Add resource'
        },
        notification: {
            create: {
                success: 'Add new resource success',
                failure: 'Cannot add new resource. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update resource\'s information success',
                failure: 'Cannot update resource\'s information. Please try again or contact Administrators.'
            }
        }
    },

    resource: {
        title: {
            list: 'System resource manage',
            edit: 'System resource edit',
            create: 'System resource create'
        },
        notification: {
            delete: {
                confirm: 'Do you sure want to delete %{resource_name} resource?',
                success: 'Delete resource success',
                failure: 'Delete resource failure'
            },
            create: {
                duplicated: 'Resource is exist!'
            }
        }
    },
    application: {
        title: {
            list: 'Client manage',
            create: 'Create new client',
            edit: 'Edit client\'s information',
            info: 'Client\'s information'
        }
    },

    attributes: {
        title: {
            list: 'Attributes list',
            edit: 'Edit attribute',
            create: 'Add attribute'
        },
        text: {
            attributeTypes: 'Attribute Type'
        },
        notification: {
            create: {
                success: 'Add new attribute success',
                failure: 'Cannot add new attribute. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update attribute\'s information success',
                failure: 'Cannot update attribute\'s information. Please try again or contact Administrators.'
            }
        }
    },

    relation_person: {
        title: {
            list: 'Relaton Person List',
            edit: 'Edit relation person',
            create: 'Add relation person'
        },
        filter: {
            name: 'Find person on name',
            role: 'Find person on role'

        },
        text: {
            relationTypes: 'Relation Types'
        },
        notification: {
            create: {
                success: 'Add new relation person success',
                failure: 'Cannot add new relation person. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update relation person\'s information success',
                failure: 'Cannot update relation person\'s information. Please try again or contact Administrators.'
            }
        }
    },

    groups: {
        title: {
            list: 'Group List',
            edit: 'Edit group',
            create: 'Add group'
        },
        filter: {
            name: 'Find group'
        },
        notification: {
            create: {
                success: 'Add new group success',
                failure: 'Cannot add new group. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update group\'s information success',
                failure: 'Cannot update group\'s information. Please try again or contact Administrators.'
            }
        }
    },

    radiologists: {
        title: {
            list: 'Radiologist List',
            edit: 'Edit radiologist',
            create: 'Add radiologist'
        },
        filter: {
            name: 'Find group'
        },
        notification: {
            create: {
                success: 'Add new radiologist success',
                failure: 'Cannot add new radiologist. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update radiologist\'s information success',
                failure: 'Cannot update radiologist\'s information. Please try again or contact Administrators.'
            }
        }
    },

    role_radiologist: {
        title: {
            list: 'Role List',
            edit: 'Edit role',
            create: 'Add role'
        },

        notification: {
            create: {
                success: 'Add new role success',
                failure: 'Cannot add new role. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update role\'s information success',
                failure: 'Cannot update role\'s information. Please try again or contact Administrators.'
            }
        }
    },

    centers: {
        title: {
            list: 'Centers List',
            edit: 'Edit center',
            create: 'Add center',
            show: 'Infomation center'
        },
        notification: {
            create: {
                success: 'Add new center success',
                failure: 'Cannot add new center. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update center\'s information success',
                failure: 'Cannot update center\'s information. Please try again or contact Administrators.'
            }
        }
    },

    types: {
        title: {
            list: 'Center Types List',
            edit: 'Edit center type',
            create: 'Add center type'
        },
        notification: {
            create: {
                success: 'Add new center type success',
                failure: 'Cannot add new center type. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update center type\'s information success',
                failure: 'Cannot update center type\'s information. Please try again or contact Administrators.'
            }
        }
    },

    relations: {
        title: {
            list: 'Relaton Center List',
            edit: 'Edit relation center',
            create: 'Add relation center'
        },
        filter: {
            name: 'Find center on name',
            role: 'Find center on role'

        },
        text: {
            relationTypes: 'Relation Types'
        },
        notification: {
            create: {
                success: 'Add new relation center success',
                failure: 'Cannot add new relation center. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update relation center\'s information success',
                failure: 'Cannot update relation center\'s information. Please try again or contact Administrators.'
            }
        }
    },

    relation_type_center: {
        title: {
            list: 'Relaton Center Type List',
            edit: 'Edit relation center type',
            create: 'Add relation center type'
        },

        notification: {
            create: {
                success: 'Add new relation center type success',
                failure: 'Cannot add new relation center type. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update relation center type\'s information success',
                failure: 'Cannot update relation center type\'s information. Please try again or contact Administrators.'
            }
        }
    },


    modality: {
        title: {
            list: 'Modalities Management',
            edit: 'Edit modality',
            create: 'Add modality',
            information: 'Modality Information',
            config: 'Modality Configuration'
        },
        text: {
            selectRentType: 'Please select rental type of modality',
            owner: 'Owner',
            rent: 'Rent'
        },
        button: {
            testConnect: 'Test connection'
        },
        notification: {
            testConnect: {
                success: 'Connect success',
                failure: 'Cannot connect to modality. Please try again or contact Administrators.!'
            },
            create: {
                success: 'Add new modality success',
                failure: 'Cannot add new modality. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update modality\'s information success',
                failure: 'Cannot update modality\'s information. Please try again or contact Administrators.'
            }
        }
    },
    report: {
        error: 'Cannot download report. Please try again or contact admin!',
        loading: 'Downloading report...'
    },
    patient: {
        title: {
            list: 'Patients Management',
            edit: 'Edit patient',
            create: 'Add patient',
            history: 'History',
            info: 'Patient Information'
        },
        notification: {
            duplicateId: 'The patient id already exists. Please enter a new id',
            duplicateIdentifier: '%{identifierTypeId} %{identifier} already exists.',
            create: {
                success: 'Add new patient success',
                failure: 'Cannot add new patient. Please try again or contact Administrators.'
            },
            update: {
                success: 'Update patient\'s information success',
                failure: 'Cannot update patient\'s information. Please try again or contact Administrators.'
            }
        }
    },
    order: {
        title: {
            list: 'Order Management',
            edit: 'Edit Radiology Order',
            create: 'Create Radiology Order',
            patientInfo: 'Patient Information',
            request: 'Request Information'
        },
        notification: {
            patientNotFound: 'Patient not found. Please create new patient\'s info!',
            duplicateOrderId: 'The order id already exists. Please enter a new order id'
        }
    },
    teleOrder: {
        title: {
            list: 'Teleradiology Order Management',
            create: 'Create Teleradiology Order',
            dicom: 'Study Information'
        },
        label: {
            selectDestination: 'Select send destination',
            selectSpecificDoctor: 'Select specific doctor',
            chooseDoctor: 'Choose doctor',
            dontSendPatientInfo: 'Don\'t send patient info'
        }
    },
    template: {
        title: {
            list: 'Report Templates List',
            create: 'Create Report Template',
            edit: 'Edit Report Template'
        },
        notification: {
            empty: 'Report body and conclusion are required'
        }
    }
};
