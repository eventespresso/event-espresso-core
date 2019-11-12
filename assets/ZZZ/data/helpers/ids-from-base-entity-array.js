import { isArray } from 'lodash';

/**
 * Extract the ids from an array of BaseEntity instances.
 *
 * Note, this could return a smaller count of array items if anything in the
 * incoming array is not a BaseEntity.
 *
 * @param {Array<BaseEntity>} entities
 * @return {Array} An array of ids.
 */
export function getIdsFromBaseEntityArray( entities ) {
	return isArray( entities ) ?
		entities
			.map( ( entity ) => !! entity.id ? entity.id : false )
			.filter( ( x ) => x ) :
		entities;
}
