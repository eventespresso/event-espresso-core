/**
 * External imports
 */
import { reduce } from 'lodash';

/**
 * Converts an incoming plain object of entities to a javascript Map object.
 * @param {Array<number|string,BaseEntity>}entities
 * @return {Map} A map.
 */
export const convertToMapFromObject = ( entities ) => {
	const reduceCallback = ( mapped, entity ) => {
		mapped.set( entity.id, entity );
		return mapped;
	};
	return reduce( entities, reduceCallback, new Map() );
};
