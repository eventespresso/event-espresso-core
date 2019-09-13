/**
 * External imports
 */
import { useEffect, useState } from '@wordpress/element';

const EMPTY_ARRAY = [];

/**
 * tracks current page for any paginated list
 *
 * @param {number} perPage
 * @param {BaseEntity[]} entities
 * @return {Object} - currentPage
 *                  - setCurrentPage - callback for changing currentPage
 *                  - paginatedEntities - array of entities for current page
 */
const useEntityPagination = ( perPage, entities ) => {
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const pageNumber = parseInt( currentPage, 10 );
	const lastPage = Math.ceil( entities.length / perPage );
	const actualPageNumber = pageNumber <= lastPage ? pageNumber : lastPage;
	useEffect( () => {
		if ( pageNumber > 1 && pageNumber > lastPage ) {
			setCurrentPage( lastPage );
		}
	}, [ perPage, currentPage, entities.length ] );
	return {
		currentPage: actualPageNumber,
		setCurrentPage,
		paginatedEntities: Array.isArray( entities ) ?
			entities.slice(
				( actualPageNumber - 1 ) * perPage,
				actualPageNumber * perPage
			) : EMPTY_ARRAY
	};
};

export default useEntityPagination;
