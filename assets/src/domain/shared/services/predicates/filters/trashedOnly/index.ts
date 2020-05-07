import { Trashable } from '@dataServices/types';
import isTrashed from '../../isTrashed';

const trashedOnly = <T extends Trashable>(entities: T[]): T[] => {
	return entities.filter((entity) => isTrashed(entity));
};

export default trashedOnly;
