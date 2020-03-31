export const user = {
    name: 'User',
    fields: {
        uuid: 'System ID',
        username: 'Username',
        password: 'Password',
        firstName: 'First name',
        middleName: 'Middle name',
        lastName: 'Last name',
        address: 'Address',
        birthDate: 'Date of birth',
        gender: 'Gender',
        roles: 'Roles',
        authorities: 'Authorities',
        fullName: 'Full name',
        degree: 'Degree',
        race: 'Race',
        phoneNumber: 'Phone number',
        email: 'Email',
        passwordVerify: 'Confirm password',
        passwordNew: 'New password',
        all: 'All',
        hint: 'Hint',
        active: 'Active'
    },
    labels: {
        changePassword: 'Change Password',
        chooseExistPerson: 'Or choose a person exist',
        info: 'User\'s information'
    },
    actions: {
        add: 'Add user',
        addPerson: 'Add new person',
        chooseAvatar: 'Choose Avatar'
    }
};

export const roles = {
    name: 'Role',
    fields: {
        id: 'ID',
        name: 'Role name',
        description: 'Description',
        authorities: 'Authorities',
        roles: 'Roles',
        parentRoleIds: 'Inherited roles'
    }
};

export const authorities = {
    name: 'Privilege',
    fields: {
        uuid: 'UUID',
        id: 'ID',
        authority: 'Authority',
        description: 'Description'
    }
};
