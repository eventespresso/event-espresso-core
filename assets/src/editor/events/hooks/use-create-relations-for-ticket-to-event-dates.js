/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Returns a function handling the dispatch event for updating relations
 * between a ticket entity and one or more event date entities.
 *
 * The returned function receives the following arguments:
 *  -  ticket entity
 *  -  eventDates array of event date entities
 *
 * @return {function}  A function for updating the ticket relation.
 */
const useCreateRelationsForTicketToEventDates = () => {
	const { createRelations } = useDispatch( 'eventespresso/core' );
	return useCallback( async ( ticket, eventDates ) => {
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			throw new Error(
				__(
					'Unable to create relation because an invalid Ticket Entity was supplied.',
					'event_espresso'
				)
			);
		}
		eventDates = Array.isArray( eventDates ) ? eventDates : [ eventDates ];
		eventDates.forEach( ( eventDate ) => {
			if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
				throw new Error(
					__(
						'Unable to create relation because an invalid Event Date Entity was supplied.',
						'event_espresso'
					)
				);
			}
		} );
		await createRelations(
			'ticket',
			ticket.id,
			'price',
			eventDates
		);
	} );
};

export default useCreateRelationsForTicketToEventDates;
