export const person = {
    name: 'Person',
    fields: {
        fullName: 'Fullname',
        degree: 'Degree',
        race: 'Race',
        personAddresses: 'Address',
        birthDate: 'Birthday',
        gender: 'Gender',
        deathDate: 'Deathday',
        title: 'Title'
    },
    labels: {
        info: 'Person\'s information',
        listUser: 'List user of this person'
    }
};

export const addresses = {
    name: 'Address',
    fields: {
        personId: 'ID person',
        address: 'Address',
        district: 'District',
        city: 'City',
        country: 'Country',
        preferred: 'Preferred'
    }
};

export const attributes = {
    name: 'Attribute',
    fields: {
        id: 'ID',
        value: 'Value',
        personAttributeType: 'Attribute types',
        personId: 'Person ID',
        fullName: 'Full Name',
        name: 'Attribute Name',
        format: 'Format',
        description: 'Description'

    }
};
