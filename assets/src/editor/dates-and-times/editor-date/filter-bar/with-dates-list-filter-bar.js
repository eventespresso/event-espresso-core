/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';
import { filterDates, sortDatesList } from './dates-list-filter-utils';
import { default as DateListFilterBar } from './dates-list-filter-bar';
import {
	EntityListFilterBar,
} from '../../../../higher-order-components/filter-bar';

/**
 * withDatesListFilterBar
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityListFilterBar & DateListFilterBar component
 * that controls how entities are displayed
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default createHigherOrderComponent(
	( EntityList ) => {
		return class extends Component {
			/**
			 * filters the dates list based on the current filter state
			 *
			 * @param {Array} entities
			 * @param {string} showDates
			 * @param {string} sortDates
			 * @return {Array} filtered list of dates
			 */
			getDates = ( entities, showDates, sortDates ) => {
				return showDates && sortDates && entities ?
					sortDatesList(
						filterDates( entities, showDates ),
						sortDates
					) :
					[];
			};

			render() {
				const {
					displayDates,
					showDates,
					sortDates,
					setDisplayDates,
					setShowDates,
					setSortDates,
					datesPerPage,
					datesView,
					setDatesPerPage,
					setDatesListView,
					setDatesGridView,
					...otherProps
				} = this.props;
				let { entities } = this.props;
				entities = this.getDates( entities, showDates, sortDates );
				delete otherProps.entities;
				return (
					<Fragment>
						<EntityListFilterBar
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
