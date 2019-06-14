import { createHigherOrderComponent } from '@wordpress/compose';

import { getFilteredDateEntitiesList } from './with-date-entities-list-filter-bar';

const DEFAULT_EMPTY_ARRAY = [];

const withFilteredDateEntitiesList = createHigherOrderComponent(
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
	}
);

export default withFilteredDateEntitiesList;
