/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';
import { filterDates, sortDates } from './dates-list-filter-utils';
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
			 * @param {string} show
			 * @param {string} sort
			 * @return {Array} filtered list of dates
			 */
			getDates = ( entities, show, sort ) => {
				return show && sort && entities ?
					sortDates(
						filterDates( entities, show ),
						sort
					) :
					[];
			};

			render() {
				const {
					display,
					show,
					sort,
					setDisplay,
					setShow,
					setSort,
					perPage,
					view,
					setPerPage,
					setListView,
					setGridView,
					...otherProps
				} = this.props;
				let { entities } = this.props;
				entities = this.getDates( entities, show, sort );
				delete otherProps.entities;
				return (
					<Fragment>
						<EntityListFilterBar
							perPage={ perPage }
							view={ view }
							setPerPage={ setPerPage }
							setListView={ setListView }
							setGridView={ setGridView }
							entityFilters={
								<DateListFilterBar
									display={ display }
									show={ show }
									sort={ sort }
									setDisplay={ setDisplay }
									setShow={ setShow }
									setSort={ setSort }
								/>
							}
						/>
						<EntityList
							entities={ entities }
							entitiesPerPage={ perPage }
							view={ view }
							showDate={ display }
							{ ...otherProps }
						/>
					</Fragment>
				);
			}
		};
	},
	'withDatesListFilterBar'
);
