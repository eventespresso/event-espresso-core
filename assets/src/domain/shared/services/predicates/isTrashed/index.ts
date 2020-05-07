import { Trashable } from '@dataServices/types';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if ticket is trashed
 */
const isTrashed = <T extends Trashable>(entity: T): boolean => {
	// `isTrashed` may be undefined, safe to compare with boolean
	return entity.isTrashed === true;
};

export default isTrashed;
