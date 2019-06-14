/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import { getFilteredDateEntitiesList } from './with-date-entities-list-filter-bar';

const DEFAULT_EMPTY_ARRAY = [];

const withFilteredDateEntities = createHigherOrderComponent(
	( WrappedComponent ) => ( {
		eventEntityLoaded,
		dateEntitiesLoaded,
		dateEntities,
		showDates,
		datesSortedBy,
		...otherProps
	} ) => {
		const isLoaded = eventEntityLoaded && dateEntitiesLoaded;
		const filteredDateEntities = isLoaded ?
			getFilteredDateEntitiesList(
				dateEntities,
				showDates,
				datesSortedBy
			) :
			DEFAULT_EMPTY_ARRAY;
		return <WrappedComponent
			filteredDateEntities={ filteredDateEntities }
			allDateEntities={ dateEntities }
			eventEntityLoaded={ eventEntityLoaded }
			dateEntitiesLoaded={ dateEntitiesLoaded }
			showDates={ showDates }
			datesSortedBy={ datesSortedBy }
			{ ...otherProps }
		/>;
	},
	'withFilteredDateEntities'
);

export default withFilteredDateEntities;
