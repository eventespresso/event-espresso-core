/**
 * External imports
 */
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ticketModel } from '@eventespresso/model';

const DEFAULT_DISPATCH = { copyTicketEntity: () => false };

const withCopyTicketEntity = createHigherOrderComponent(
	withDispatch( (
		dispatch,
		{
			ticketEntity,
			dateEntities,
			dateEntitiesLoaded,
		},
		{ select }
	) => {
		const { MODEL_NAME: TICKET } = ticketModel;
		if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
			return DEFAULT_DISPATCH;
		}
		const {
			createEntity,
			createRelations,
		} = dispatch( 'eventespresso/core' );
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const copyTicketEntity = async () => {
			const newTicket = await createEntity( TICKET, ticketEntity.forClone );
			if ( dateEntitiesLoaded ) {
				createRelations(
					TICKET,
					newTicket.id,
					'datetime',
					dateEntities
				);
			}
			// @todo, this is not quite done because it needs to add the relations
			// of the prices to the priceType.
			// get related prices clone, and add.
			const relatedPrices = getRelatedEntities( ticketEntity, 'prices' );
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
					'price',
					newPrices
				);
			}
		};
		return { copyTicketEntity };
	} ),
	'withCopyTicketEntity'
);

export default withCopyTicketEntity;
