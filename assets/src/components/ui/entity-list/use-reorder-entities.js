/**
 * External imports
 */
import { sortBy } from 'lodash';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns a custom hook
 * for changing the order of the provided array of entities,
 * given indexes for an entity's existing location in
 * that array and the desired new location.
 * Because the provided array of entities may NOT be
 * the full set of entities, the full list must also
 * be supplied and it will be reorder as well,
 * with the entities from the subset array moved
 * to the beginning of the full set.
 *
 * @function
 * @param {string} modelName
 * @param {Function} setSortBy
 * @param {Function} setEntityIds
 * @return {Function} custom hook
 */
const useReorderEntities = ( { modelName, setSortBy, setEntityIds } ) => {
	/**
	 * @function
	 * @param {Array} entities    	a subset of filtered entities
	 * @param {Array} allEntities    a list of ALL entities of the same type
	 *   that may not have been present in the subset list that was sorted. It
	 *   will be reorder as well.
	 * @param {number|string} oldIndex 	existing location of entity to be
	 *     moved
	 * @param {number|string} newIndex 	target location for entity in subset
	 *     array
	 */
	return useCallback( (
		entities,
		allEntities,
		oldIndex,
		newIndex,
	) => {
		oldIndex = parseInt( oldIndex, 10 );
		newIndex = parseInt( newIndex, 10 );
		if ( newIndex === oldIndex ) {
			return;
		}
		if ( newIndex < 0 || oldIndex < 0 ) {
			throw new Error(
				'Can not reorder the entity list because' +
				' indexes can not be negative!' +
				"\n oldIndex: " + JSON.stringify( oldIndex ) +
				"\n newIndex: " + JSON.stringify( newIndex )
			);
		}
		if ( ! Array.isArray( entities ) ||
			! Array.isArray( allEntities ) ) {
			throw new Error(
				'Can not reorder the entity list because one or more of the' +
				' supplied entity lists were invalid!' +
				"\n entities: " + JSON.stringify( entities ) +
				"\n allEntities: " + JSON.stringify( allEntities )
			);
		}
		// remove entity from existing location in filtered list
		const [ removed ] = entities.splice( oldIndex, 1 );
		// insert removed entity into new location in same list
		entities.splice( newIndex, 0, removed );
		// now loop thru entities in filtered list
		entities.forEach( ( entity, index ) => {
			if ( isModelEntityOfModel( entity, modelName ) ) {
				// reset the order property for all entities in filtered list
				entity.order = index + 1;
				// grab index of reordered entities in list of all entities
				const indexInAll = allEntities.indexOf( entity );
				// remove reordered entities from list of all entities
				allEntities.splice( indexInAll, 1 );
			} else {
				throw new Error(
					'Can not reorder the entity list because' +
					' an invalid entity was supplied!' +
					"\n entity: " + JSON.stringify( entity )
				);
			}
		} );
		// reorder the list of all entities as well...
		// reverse the reordered list of entities
		const reversed = entities.reverse();
		reversed.forEach( ( entity ) => {
			// add each entity to the beginning of the allEntities array
			allEntities.unshift( entity );
			// so we previously removed these entities, but now we are added
			// them back onto the array at the beginning and in reverse
			// order. So we add #3 to the top, then #2, then #1,
			// so that the final order of the array will be #1, #2, #3,
			// followed by all of the other entities previously in the array
		} );
		// but now we need to reset the order properties for ALL entities
		allEntities.forEach( ( entity, index ) => {
			// add 1 so we don't end up with order: 0
			entity.order = index + 1;
		} );
		allEntities = sortBy( allEntities, [ 'order' ] );
		setEntityIds( allEntities.map( ( entity ) => entity.id ) );
		setSortBy( 'by-order' );
	}, [
		modelName,
		setSortBy,
		setEntityIds,
	] );
};

export default useReorderEntities;
