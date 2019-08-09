/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

const useDatesListFilterState = ( {
	listId,
	defaultShowDates = 'active-upcoming',
	defaultDatesSortedBy = 'chronologically',
	defaultDisplayDates = 'start',
} ) => useSelect( ( select ) => {
	const store = select( 'eventespresso/filter-state' );
	const { getEntitiesByIds } = select( 'eventespresso/core' );
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
		filteredDateEntities: getEntitiesByIds(
			'datetime',
			store.getFilter(
				listId,
				'filteredDateIds',
				DEFAULT_EMPTY_ARRAY
			)
		),
	};
}, [ defaultShowDates, defaultDatesSortedBy, defaultDisplayDates ] );

export default useDatesListFilterState;
