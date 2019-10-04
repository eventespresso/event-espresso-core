/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { useReorderEntities } from '@eventespresso/components';

/**
 * @function
 * @param {Array} filteredTickets
 * @param {Array} allTickets
 * @param {Function} setEntityIds
 * @param {Function} setSortBy
 * @return {Function} callback for reordering ticket entity list
 */
const useReorderTickets = (
	filteredTickets,
	allTickets,
	setEntityIds,
	setSortBy
) => {
	const reorderEntities = useReorderEntities( {
		modelName: 'ticket',
		setEntityIds,
		setSortBy,
	} );
	/**
	 * @function
	 * @param {Object} result
	 * @return {Function}
	 */
	return useCallback( ( result ) => {
		const { destination, source } = result;
		if (
			! destination ||
			(
				source.index === destination.index &&
				destination.droppableId === source.droppableId
			) ||
			destination.droppableId !==
			'ticket-entities-list-view-droppable'
		) {
			return;
		}
		reorderEntities(
			filteredTickets,
			allTickets,
			source.index,
			destination.index
		);
	}, [
		filteredTickets,
		allTickets,
		reorderEntities,
	] );
};

export default useReorderTickets;
