/**
 * External imports
 */
import { useState } from '@wordpress/element';

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
	return {
		currentPage: pageNumber,
		setCurrentPage,
		paginatedEntities: Array.isArray( entities ) ?
			entities.slice(
				( pageNumber - 1 ) * perPage,
				pageNumber * perPage
			) : EMPTY_ARRAY
	};
};

export default useEntityPagination;
