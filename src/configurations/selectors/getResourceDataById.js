import { get } from 'lodash';

export default (resource, id) => (state) => (get(state, ['admin', 'resources', resource, 'data', id], {}));
