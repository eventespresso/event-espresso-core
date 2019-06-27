/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Fragment, useMemo, useEffect } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { EntityListFilterBar } from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { default as DateListFilterBar } from './date-list-filter-bar';
import {
	filterDateEntities,
	searchDateEntities,
	sortDateEntitiesList,
} from './date-entities-list-filter-utils';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * filters the dates list based on the current filter state
 *
 * @param {Array} dateEntities
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @return {Array} filtered list of dateEntities
 */
export const getFilteredDateEntitiesList = ( dateEntities, showDates, datesSortedBy ) => {
	return showDates && datesSortedBy && ! isEmpty( dateEntities ) ?
		sortDateEntitiesList(
			filterDateEntities( dateEntities, showDates ),
			datesSortedBy
		) :
		[];
};

/**
 * withDateEntitiesListFilterBar
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityListFilterBar & DateListFilterBar component
 * that controls how entities are displayed
 *
 * @param {Object} EntityList
 * @return {Object} EntityList with added DateListFilterBar
 */
const withDateEntitiesListFilterBar = createHigherOrderComponent(
	( EntityList ) => ( {
		displayDates,
		showDates,
		datesSortedBy,
		setDisplayDates,
		setShowDates,
		setDatesSortedBy,
		searchDateName,
		datesPerPage,
		datesView,
		setSearchDateName,
		setDatesPerPage,
		setDatesListView,
		setDatesGridView,
		setFilteredDateEntities,
		defaultDatesListView,
		defaultDatesListPerPage,
		setDefaultDatesListView,
		setDefaultDatesListPerPage,
		dateEntities = DEFAULT_EMPTY_ARRAY,
		...otherProps
	} ) => {
		const filteredEntities = useMemo(
			() => {
				const entities = searchDateEntities( dateEntities, searchDateName );
				return getFilteredDateEntitiesList(
					entities,
					showDates,
					datesSortedBy
				);
			},
			[
				dateEntities,
				searchDateName,
				showDates,
				datesSortedBy,
			]
		);
		// whenever filtered entities changes let's update the date ids
		// in the state.
		useEffect( () => {
			setFilteredDateEntities(
				filteredEntities.map( ( dateEntity ) => dateEntity.id )
			);
		}, [ filteredEntities ] );

		return (
			<Fragment>
				<EntityListFilterBar
					name="DateListFilterBar"
					searchText={ searchDateName }
					setSearchText={ setSearchDateName }
					perPage={ datesPerPage }
					view={ datesView }
					setPerPage={ setDatesPerPage }
					setListView={ setDatesListView }
					setGridView={ setDatesGridView }
					defaultView={ defaultDatesListView }
					defaultPerPage={ defaultDatesListPerPage }
					setDefaultView={ setDefaultDatesListView }
					setDefaultPerPage={ setDefaultDatesListPerPage }
					entityFilters={
						<DateListFilterBar
							displayDates={ displayDates }
							showDates={ showDates }
							datesSortedBy={ datesSortedBy }
							setDisplayDates={ setDisplayDates }
							setShowDates={ setShowDates }
							setDatesSortedBy={ setDatesSortedBy }
						/>
					}
				/>
				<EntityList
					entities={ filteredEntities }
					entitiesPerPage={ datesPerPage }
					view={ datesView }
					noResultsText={
						__(
							'no results found (try changing filters)',
							'event_espresso'
						)
					}
					showDate={ displayDates }
					{ ...otherProps }
				/>
			</Fragment>
		);
	},
	'withDateEntitiesListFilterBar'
);

export default withDateEntitiesListFilterBar;
