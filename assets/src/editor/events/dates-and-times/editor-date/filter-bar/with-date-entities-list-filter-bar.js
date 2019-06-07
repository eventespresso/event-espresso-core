/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
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

/**
 * filters the dates list based on the current filter state
 *
 * @param {Array} dateEntities
 * @param {string} showDates
 * @param {string} sortDates
 * @return {Array} filtered list of dateEntities
 */
export const getFilteredDateEntitiesList = ( dateEntities, showDates, sortDates ) => {
	return showDates && sortDates && ! isEmpty( dateEntities ) ?
		sortDateEntitiesList(
			filterDateEntities( dateEntities, showDates ),
			sortDates
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
export default createHigherOrderComponent(
	( EntityList ) => {
		return class extends Component {
			render() {
				const {
					displayDates,
					showDates,
					sortDates,
					setDisplayDates,
					setShowDates,
					setSortDates,
					searchDateName,
					datesPerPage,
					datesView,
					setSearchDateName,
					setDatesPerPage,
					setDatesListView,
					setDatesGridView,
					prefiltered = false,
					entities,
					...otherProps
				} = this.props;
				let filteredEntities = searchDateEntities( entities, searchDateName );
				filteredEntities = prefiltered ?
					filteredEntities :
					getFilteredDateEntitiesList(
						filteredEntities,
						showDates,
						sortDates
					);
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
							entityFilters={
								<DateListFilterBar
									displayDates={ displayDates }
									showDates={ showDates }
									sortDates={ sortDates }
									setDisplayDates={ setDisplayDates }
									setShowDates={ setShowDates }
									setSortDates={ setSortDates }
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
			}
		};
	},
	'withDateEntitiesListFilterBar'
);
