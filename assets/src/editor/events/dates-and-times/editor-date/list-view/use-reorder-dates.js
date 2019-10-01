/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { useReorderEntities } from '@eventespresso/components';

/**
 * @function
 * @param {Array} filteredEventDates
 * @param {Array} allEventDates
 * @param {Function} setEntityIds
 * @param {Function} setSortBy
 * @return {Function} callback for reordering ticket entity list
 */
const useReorderDates = (
	filteredEventDates,
	allEventDates,
	setEntityIds,
	setSortBy
) => {
	const reorderEntities = useReorderEntities( { setEntityIds, setSortBy } );
	/**
	 * @function
	 * @param {Object} result
	 * @return {Function}
	 */
	return useCallback( ( result ) => {
		const { destination, source } = result;
		if (
			! destination || (
				source.index === destination.index &&
				destination.droppableId === source.droppableId
			) ||
			destination.droppableId !== 'date-entities-list-view-droppable'
		) {
			return;
		}
		reorderEntities(
			filteredEventDates,
			allEventDates,
			source.index,
			destination.index
		);
	}, [ filteredEventDates, allEventDates, reorderEntities ] );
};

export default useReorderDates;
