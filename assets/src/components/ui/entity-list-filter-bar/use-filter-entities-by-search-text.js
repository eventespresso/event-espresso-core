/**
 * External imports
 */
import { useCallback } from '@wordpress/element';

const useFilterEntitiesBySearchText = () => useCallback(
	( entities, searchText ) => {
		// console.log( 'useFilterEntitiesBySearchText > entities', entities );
		return searchText && Array.isArray( entities ) ?
			entities.filter( ( entity ) => {
				const field = entity.hasOwnProperty( 'name' ) && entity.name ?
					entity.name :
					null;
				console.log( ' > > field', field );
				return field ?
					field.toLowerCase().search( searchText.toLowerCase() ) !== -1 :
					false;
			} ) : entities
	},
	[]
);

export default useFilterEntitiesBySearchText;
