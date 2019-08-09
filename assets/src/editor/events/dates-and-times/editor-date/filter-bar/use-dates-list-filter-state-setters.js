/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';

const useDatesListFilterStateSetters = ( listId ) => {
	const store = useDispatch( 'eventespresso/filter-state' );
	return {
		setShowDates: ( showDates ) => store.setFilter(
			listId,
			'showDates',
			showDates
		),
		setDatesSortedBy: ( datesSortedBy ) => store.setFilter(
			listId,
			'datesSortedBy',
			datesSortedBy
		),
		setDisplayDates: ( displayDates ) => store.setFilter(
			listId,
			'displayDates',
			displayDates
		),
		setFilteredDateEntities: ( dateEntityIds ) => store.setFilter(
			listId,
			'filteredDateIds',
			dateEntityIds
		),
	};
};

export default useDatesListFilterStateSetters;
