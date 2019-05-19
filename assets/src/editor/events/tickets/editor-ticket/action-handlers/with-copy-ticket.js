/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ticketModel } from '@eventespresso/model';

const DEFAULT_DISPATCH = { copyTicket: () => false };

const withCopyTicket = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{
			ticket,
			ticketDatetimes,
			datesLoaded,
		},
		{ select }
	) => {
		const { MODEL_NAME: TICKET } = ticketModel;
		if ( ! isModelEntityOfModel( ticket, TICKET ) ) {
			return DEFAULT_DISPATCH;
		}
		const {
			createEntity,
			createRelations,
		} = dispatch( 'eventespresso/core' );
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const copyTicket = async () => {
			const newTicket = await createEntity( TICKET, ticket.forClone );
			if ( datesLoaded ) {
				createRelations(
					TICKET,
					newTicket.id,
					'datetimes',
					ticketDatetimes
				);
			}
			// get related prices clone, and add.
			const relatedPrices = getRelatedEntities( ticket, 'prices' );
			if ( relatedPrices ) {
				const newPrices = [];
				for ( let i = 0; i < relatedPrices.length; i++ ) {
					const newPrice = await createEntity(
						'price',
						relatedPrices[ i ].forClone
					);
					newPrices.push( newPrice );
				}
				createRelations(
					TICKET,
					newTicket.id,
					'prices',
					newPrices
				);
			}
		};
		return { copyTicket };
	} ),
	'withCopyTicket'
);

export default withCopyTicket;
