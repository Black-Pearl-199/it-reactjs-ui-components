import { user, roles, authorities } from './user';
import { client } from './clients';
import { centers, relations, types } from './centers';
import { radiologists, groups, members } from './radiologist';
import { person, attributes, addresses } from './person';
import { gender } from './gender';
import { authority } from './authority';
import { role } from './role';
import { title } from './title';
import { password } from './password';
import { resource } from './resource';
import { PASSWORDS } from '../../../resources';

export const resources = {
    user,
    roles,
    authorities,
    client,
    relations,
    centers,
    types,
    person,
    attributes,
    addresses,
    radiologists,
    groups,
    members,
    gender,
    authority,
    role,
    title,
    [PASSWORDS]: password,
    resource
};
