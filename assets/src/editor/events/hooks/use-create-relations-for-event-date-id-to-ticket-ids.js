/**
 * External imports
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Returns a function handling the dispatch event for updating relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDateId ID for event date entity
 *  -  ticketIds array of ticket entity IDs
 *
 * @return {function}  A function for updating the ticket relation.
 */
const useCreateRelationsForEventDateIdToTicketIds = () => {
	const { createRelations } = useDispatch( 'eventespresso/core' );
	const { getEntitiesByIds } = useSelect(
		( select ) => select( 'eventespresso/core' ),
		[]
	);
	return useCallback( async ( eventDateId, ticketIds ) => {
		let tickets = await getEntitiesByIds( 'ticket', ticketIds );
		tickets = Array.isArray( tickets ) ? tickets : [ tickets ];
		tickets.forEach( ( ticket ) => {
			if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
				throw new Error(
					__(
						'Unable to create relation because an invalid Ticket Entity was supplied.',
						'event_espresso'
					)
				);
			}
		} );
		await createRelations(
			'datetime',
			eventDateId,
			'ticket',
			tickets,
		);
	} );
};

export default useCreateRelationsForEventDateIdToTicketIds;
