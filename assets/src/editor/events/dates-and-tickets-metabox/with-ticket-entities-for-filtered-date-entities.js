import { createHigherOrderComponent } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { getDateEntityIds } from '../dates-and-times/data/utils';
import { intersection } from 'lodash';

const DEFAULT_EMPTY_ARRAY = [];

const withTicketEntitiesForFilteredDateEntities = createHigherOrderComponent(
	withSelect( (
		select,
		{
			filteredDateEntities = DEFAULT_EMPTY_ARRAY,
			ticketEntities = DEFAULT_EMPTY_ARRAY,
		}
	) => {
		const dateIds = getDateEntityIds( filteredDateEntities );
		const { getRelationIdsForEntityRelation } = select( 'eventespresso/core' );
		const filteredTicketEntities = ticketEntities.filter( ( ticketEntity ) => {
			const relatedDateEntities = getRelationIdsForEntityRelation(
				ticketEntity,
				'datetime'
			);
			return relatedDateEntities.length > 0 &&
				intersection( relatedDateEntities, dateIds ).length > 0;
		} );
		return {
			allTicketEntities: ticketEntities,
			ticketEntities: filteredTicketEntities,
		};
	} ),
	'withTicketEntitiesForFilteredDateEntities'
);

export default withTicketEntitiesForFilteredDateEntities;
