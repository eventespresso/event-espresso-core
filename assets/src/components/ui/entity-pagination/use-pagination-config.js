/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * tracks current page for any paginated list
 *
 * @param {Object} paginationConfig
 * @return {Object} - currentPage
 *                  - setCurrentPage - callback for changing currentPage
 */
const usePaginationConfig = ( paginationConfig ) => useMemo( () => {
	return paginationConfig.labels = paginationConfig.labels &&
		paginationConfig.labels.first &&
		paginationConfig.labels.last &&
		paginationConfig.labels.prev &&
		paginationConfig.labels.next ?
			paginationConfig.labels :
			{
				first: __( 'First', 'event_espresso' ),
				last: __( 'Last', 'event_espresso' ),
				prev: __( 'Prev', 'event_espresso' ),
				next: __( 'Next', 'event_espresso' ),
			};
}, [ paginationConfig ] );

export default usePaginationConfig;
