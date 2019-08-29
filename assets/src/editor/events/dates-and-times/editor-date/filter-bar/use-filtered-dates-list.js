/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { useFilterEntitiesBySearchText } from '@eventespresso/components';

import {
	filterDateEntities,
	sortDateEntitiesList,
} from './date-entities-list-filter-utils';

const EMPTY_ARRAY = [];

// useFilteredEventDates use-filtered-event-dates
const useFilteredDatesList = ( {
	dateEntities,
	showDates,
	datesSortedBy,
	searchText = '',
} ) => {
	const dates = Array.isArray( dateEntities ) ? dateEntities : EMPTY_ARRAY;
	const searchedDates = useFilterEntitiesBySearchText( dates, searchText );
	const filteredDates = useMemo( () => {
		return showDates && searchedDates !== EMPTY_ARRAY ?
			filterDateEntities( searchedDates, showDates ) :
			EMPTY_ARRAY;
	}, [ searchedDates, showDates ] );
	return useMemo( () => {
		return datesSortedBy && filteredDates !== EMPTY_ARRAY ?
			sortDateEntitiesList( filteredDates, datesSortedBy ) :
			EMPTY_ARRAY;
	}, [ filteredDates, datesSortedBy ] );
};

useFilteredDatesList.propTypes = {
	dateEntities: PropTypes.arrayOf( PropTypes.object ),
	showDates: PropTypes.string,
	datesSortedBy: PropTypes.string,
	searchText: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
};

export default useFilteredDatesList;
