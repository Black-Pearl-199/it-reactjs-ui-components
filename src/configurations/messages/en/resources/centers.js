export const centers = {
    name: 'Center',
    fields: {
        id: 'ID',
        name: 'Privider name',
        address: 'Address',
        country: 'Country',
        stateProvince: 'Province',
        district: 'District',
        organization: 'Organization',
        stateOwned: 'StateOwned',
        specialized: 'Specialized',
        centerType: 'Center Type',
        phone: 'Phone number',
        types: 'Provider type',
        description: 'Description',
        email: 'Email'
    }
};

export const types = {
    name: 'Type',
    fields: {
        id: 'ID',
        name: 'Type name',
        description: 'Description'
    }
};

export const relations = {
    name: 'Relation',
    fields: {
        id: 'ID',
        name: 'Relation name',
        providerA: 'Provider A',
        providerB: 'Provider B',
        aisToB: 'A is to B',
        bisToA: 'B is to A',
        description: 'Description',
        personA: 'Person A',
        personB: 'Person B',
        relationshipType: 'Relationship Type',
        healthCenterA: 'Center A',
        healthCenterB: 'Center B',
        dateStart: 'Date Start',
        dateEnd: 'Date end',
        active: 'Active',
        preferred: 'Preferred'

    }
};
