/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Returns a function handling the dispatch event for updating relations
 * between an event date entity and one or more ticket entities.
 *
 * The returned function receives the following arguments:
 *  -  eventDate entity
 *  -  tickets array of ticket entities
 *
 * @return {function}  A function for updating the ticket relation.
 */
const useCreateRelationsForEventDateToTickets = () => {
	const { createRelations } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( eventDate, tickets ) => {
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			throw new Error(
				__(
					'Unable to create relation because an invalid Event Date Entity was supplied.',
					'event_espresso'
				)
			);
		}
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
			eventDate,
			'ticket',
			tickets,
		);
	} );
};

export default useCreateRelationsForEventDateToTickets;
