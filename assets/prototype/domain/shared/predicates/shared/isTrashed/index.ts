/**
 * Internal dependencies
 */
import { Trashable } from '../../../../eventEditor/data/types';

/**
 * @function
 * @param {Object} entity object
 * @return {boolean} true if ticket is trashed
 */
const isTrashed = <T extends Trashable>(entity: T): boolean => {
	return entity.isTrashed;
};

export default isTrashed;
