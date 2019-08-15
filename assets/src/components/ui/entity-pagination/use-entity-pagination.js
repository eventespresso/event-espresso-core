/**
 * External imports
 */
import { useCallback, useState } from '@wordpress/element';

const EMPTY_ARRAY = [];

/**
 * tracks current page for any paginated list
 *
 * @param {string} listId
 * @return {Object} - currentPage
 *                  - setCurrentPage - callback for changing currentPage
 */
const useEntityPagination = ( listId ) => {
	const [ pageNumber, setPageNumber ] = useState( { [ listId ]: 1 } );
	const setCurrentPage = useCallback( ( currentPage ) => setPageNumber(
		{ [ listId ]: parseInt( currentPage, 10 ) }
	), [] );
	const getPaginatedEntities = useCallback( ( entities, perPage ) => {
		const currentPage = pageNumber[ listId ];
		return Array.isArray( entities ) ?
			entities.slice(
				( currentPage - 1 ) * perPage,
				currentPage * perPage
		) : EMPTY_ARRAY
	}, [ pageNumber ] );
	return {
		currentPage: pageNumber[ listId ],
		setCurrentPage,
		getPaginatedEntities
	};
};

export default useEntityPagination;
