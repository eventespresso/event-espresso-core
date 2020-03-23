import { Trashable } from '@appServices/apollo/types';

import isTrashed from '../../isTrashed';

const notTrashed = <T extends Trashable>(entities: T[]): T[] => {
	return entities.filter((entity) => !isTrashed(entity));
};

export default notTrashed;
