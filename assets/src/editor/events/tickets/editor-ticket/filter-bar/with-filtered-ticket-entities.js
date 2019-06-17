/**
 * External imports
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

const DEFAULT_EMPTY_ARRAY = [];

const withFilteredTicketEntities = createHigherOrderComponent(
	withSelect(
		( select ) => {
			const store = select( 'eventespresso/filter-state' );
			const { getEntitiesByIds } = select( 'eventespresso/core' );
			return {
				filteredTicketEntities: getEntitiesByIds(
					'ticket',
					store.getFilter(
						'event-editor-ticket-list',
						'filteredTicketIds',
						DEFAULT_EMPTY_ARRAY
					)
				),
			};
		}
	),
	'withFilteredTicketEntities'
);

export default withFilteredTicketEntities;
