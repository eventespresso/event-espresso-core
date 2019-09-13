/**
 * External imports
 */
import { useMemo } from '@wordpress/element';

/**
 * searches through provided list of entities and returns an array
 * of entities where the set field (defaults to entity name)
 * matches the current search text (fully or partially)
 *
 * @param {BaseEntity[]} entities
 * @param {string} searchText
 * @param {string} field
 * @return {BaseEntity[]} entities matching search criteria
 */
const useFilterEntitiesBySearchText = (
	entities,
	searchText,
	field = 'name'
) => useMemo(
	() => searchText && Array.isArray( entities ) ?
		entities.filter( ( entity ) => {
			const value = entity.hasOwnProperty( field ) && entity[ field ] ?
				entity[ field ] :
				null;
			return value &&
				value.toLowerCase().search( searchText.toLowerCase() ) !== -1;
		} ) : entities,
	[ entities, searchText, field ]
);

export default useFilterEntitiesBySearchText;
