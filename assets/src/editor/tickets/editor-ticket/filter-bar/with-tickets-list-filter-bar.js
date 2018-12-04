/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';
import { filterTickets, sortTicketsList } from './tickets-list-filter-utils';
import { default as TicketListFilterBar } from './tickets-list-filter-bar';
import {
	EntityListFilterBar,
} from '../../../../higher-order-components/filter-bar';

/**
 * withTicketsListFilterBar
 * Higher-Order-Component that wraps an "EntityList" component
 * with an EntityListFilterBar & TicketListFilterBar component
 * that controls how entities are displayed
 *
 * @param {Object} paginationConfig
 * @return {Object} EntityList with added EntityPagination
 */
export default createHigherOrderComponent(
	( EntityList ) => {
		return class extends Component {
			/**
			 * filters the tickets list based on the current filter state
			 *
			 * @param {Array} entities
			 * @param {string} showTickets
			 * @param {string} sortTickets
			 * @return {Array} filtered list of tickets
			 */
			getTickets = ( entities, showTickets, sortTickets ) => {
				return showTickets && sortTickets && entities ?
					sortTicketsList(
						filterTickets( entities, showTickets ),
						sortTickets
					) :
					[];
			};

			render() {
				const {
					showTickets,
					sortTickets,
					displayTicketDate,
					setShowTickets,
					setSortTickets,
					setDisplayTicketDate,
					ticketsPerPage,
					ticketsView,
					setTicketsPerPage,
					setTicketsListView,
					setTicketsGridView,
					...otherProps
				} = this.props;
				let { entities } = this.props;
				entities = this.getTickets( entities, showTickets, sortTickets );
				delete otherProps.entities;
				return (
					<Fragment>
						<EntityListFilterBar
							perPage={ ticketsPerPage }
							view={ ticketsView }
							setPerPage={ setTicketsPerPage }
							setListView={ setTicketsListView }
							setGridView={ setTicketsGridView }
							entityFilters={
								<TicketListFilterBar
									showTickets={ showTickets }
									sortTickets={ sortTickets }
									displayTicketDate={ displayTicketDate }
									setShowTickets={ setShowTickets }
									setSortTickets={ setSortTickets }
									setDisplayTicketDate={ setDisplayTicketDate }
								/>
							}
						/>
						<EntityList
							entities={ entities }
							entitiesPerPage={ ticketsPerPage }
							view={ ticketsView }
							displayTicketDate={ displayTicketDate }
							{ ...otherProps }
						/>
					</Fragment>
				);
			}
		};
	},
	'withTicketsListFilterBar'
);
