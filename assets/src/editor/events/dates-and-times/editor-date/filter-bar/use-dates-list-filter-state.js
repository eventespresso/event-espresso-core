/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * provides state management for DatesListFilterBar component
 *
 * @param {string} listId
 * @param {string} defaultShowDates
 * @param {string} defaultDatesSortedBy
 * @param {string} defaultDisplayDates
 * @return {Object} dates list filter state getters
 */
const useDatesListFilterState = ( {
	listId,
	defaultShowDates = 'active-upcoming',
	defaultDatesSortedBy = 'chronologically',
	defaultDisplayDates = 'start',
} ) => {
	return useSelect( ( select ) => {
		const store = select( 'eventespresso/filter-state' );
		return {
			showDates: store.getFilter(
				listId,
				'showDates',
				defaultShowDates
			),
			datesSortedBy: store.getFilter(
				listId,
				'datesSortedBy',
				defaultDatesSortedBy
			),
			displayDates: store.getFilter(
				listId,
				'displayDates',
				defaultDisplayDates
			),
			filteredDateIds: store.getFilter(
				listId,
				'filteredDateIds',
				DEFAULT_EMPTY_ARRAY
			),
		};
	}, [
		listId,
		defaultShowDates,
		defaultDatesSortedBy,
		defaultDisplayDates,
	] );
};

export default useDatesListFilterState;
