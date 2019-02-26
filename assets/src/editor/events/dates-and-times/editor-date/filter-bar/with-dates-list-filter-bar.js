/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { EntityListFilterBar } from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { default as DateListFilterBar } from './dates-list-filter-bar';
import {
	filterDates,
	searchDates,
	sortDatesList,
} from './dates-list-filter-utils';

/**
 * filters the dates list based on the current filter state
 *
 * @param {Array} dates
 * @param {string} showDates
 * @param {string} sortDates
 * @return {Array} filtered list of dates
 */
export const getFilteredDatesList = ( dates, showDates, sortDates ) => {
	return showDates && sortDates && dates ?
		sortDatesList(
			filterDates( dates, showDates ),
			sortDates
		) :
		[];
};

/**
 * withDatesListFilterBar
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
					...otherProps
				} = this.props;
				delete otherProps.entities;
				let { entities } = this.props;
				entities = searchDates( entities, searchDateName );
				entities = prefiltered ?
					entities :
					getFilteredDatesList(
						entities,
						showDates,
						sortDates,
						searchDateName
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
							entities={ entities }
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
	'withDatesListFilterBar'
);
