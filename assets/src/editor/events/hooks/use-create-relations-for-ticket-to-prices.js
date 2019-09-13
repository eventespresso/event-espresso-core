/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Returns a function handling the dispatch event for updating relations
 * between a ticket entity and one or more price entities.
 *
 * The returned function receives the following arguments:
 *  -  ticket entity
 *  -  prices array of price entities
 *
 * @return {function}  A function for updating the ticket relation.
 */
const useCreateRelationsForTicketToPrices = () => {
	const { createRelations } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( ticket, prices ) => {
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			throw new Error(
				__(
					'Unable to create relation because an invalid Ticket Entity was supplied.',
					'event_espresso'
				)
			);
		}
		prices = Array.isArray( prices ) ? prices : [ prices ];
		prices.forEach( ( price ) => {
			if ( ! isModelEntityOfModel( price, 'price' ) ) {
				throw new Error(
					__(
						'Unable to create relation because an invalid Price Entity was supplied.',
						'event_espresso'
					)
				);
			}
		} );
		await createRelations(
			'ticket',
			ticket.id,
			'price',
			prices
		);
	} );
};

export default useCreateRelationsForTicketToPrices;
