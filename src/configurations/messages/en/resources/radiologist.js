export const groups = {
    name: 'Group',
    fields: {
        name: 'Name',
        description: 'Description',
        provider: 'Provider'
    }
};

export const radiologists = {
    name: 'Radiology Name',
    fields: {
        fullName: 'Full Name',
        workPhone: 'Phone Number',
        workEmail: 'Email',
        nameGroup: 'Group name',
        specialization: 'Specialization',
        title: 'Title'
    }
};

export const members = {
    name: 'Member',
    fields: {
        roleId: 'Role ID',
        group: 'Group',
        radiologist: 'Radiology'
    }
};
