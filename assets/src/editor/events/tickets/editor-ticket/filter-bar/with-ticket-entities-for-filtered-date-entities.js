import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { intersection } from 'lodash';

const DEFAULT_EMPTY_ARRAY = [];

const withTicketEntitiesForFilteredDateEntities = createHigherOrderComponent(
	withSelect( (
		select,
		{
			filteredDateEntities = DEFAULT_EMPTY_ARRAY,
			ticketEntities = DEFAULT_EMPTY_ARRAY,
			isChained = true,
		}
	) => {
		if ( ! isChained ) {
			return { ticketEntities };
		}
		const { getRelationIdsForEntityRelation } = select( 'eventespresso/core' );
		const dateIds = filteredDateEntities.map( ( dateEntity ) => dateEntity.id );
		// @todo potential optimization, only refilter ticket entities if
		// either ticketEntities have changed or dateIds have changed.
		// right now this is creating a new array on every render so
		// it's not really optimal.
		const filteredTicketEntities = ticketEntities.filter( ( ticketEntity ) => {
			const relatedDateEntities = getRelationIdsForEntityRelation(
				ticketEntity,
				'datetime'
			);
			return relatedDateEntities.length > 0 &&
				intersection( relatedDateEntities, dateIds ).length > 0;
		} );
		return { ticketEntities: filteredTicketEntities };
	} ),
	'withTicketEntitiesForFilteredDateEntities'
);

export default withTicketEntitiesForFilteredDateEntities;
