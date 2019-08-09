/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from '@wordpress/element';
import { useFilterEntitiesBySearchText } from '@eventespresso/components';

import {
	filterDateEntities,
	sortDateEntitiesList,
} from './date-entities-list-filter-utils';
import useDatesListFilterStateSetters from './use-dates-list-filter-state-setters';

const useFilteredDatesList = ( {
	listId,
	dateEntities,
	searchText,
	showDates,
	datesSortedBy,
} ) => {
	const searchEntities = useFilterEntitiesBySearchText();
	const { setFilteredDateEntities } = useDatesListFilterStateSetters( listId );
	const entities = useMemo( () => {
		dateEntities = searchEntities( dateEntities, searchText );
		return showDates && datesSortedBy && ! isEmpty( dateEntities ) ?
			sortDateEntitiesList(
				filterDateEntities( dateEntities, showDates ),
				datesSortedBy
			) : [];
	},
	[
		dateEntities,
		searchText,
		showDates,
		datesSortedBy,
	] );
	// update the date ids in state whenever the filters change
	useEffect( () => {
		setFilteredDateEntities(
			entities.map( ( dateEntity ) => dateEntity.id )
		);
	}, [ entities ] );
	return entities;
};

export default useFilteredDatesList;
