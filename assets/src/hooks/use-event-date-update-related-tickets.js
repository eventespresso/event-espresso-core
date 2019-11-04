/**
 * External imports.
 */
import { useCallback } from '@wordpress/element';
import { parseInfinity } from '@eventespresso/utils';
/**
 * Internal imports
 */
import useEventDateTickets from './use-event-date-tickets';

/**
 * A custom react hook to update the related ticket entities for the given
 * datetime entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  A datetime BaseEntity instance.
 */
const useEventDateUpdateRelatedTickets = ( eventDate ) => {
	const { tickets: relatedTickets, ticketsLoaded } = useEventDateTickets( eventDate );
	return useCallback( ( { capacity = null } ) => {
		if ( ticketsLoaded ) {
			// Make sure that the ticket qty value is compared with
			// a non negative datetime capacity value in Math.min()
			const nonNegativeDTTCapacity = parseInfinity( capacity, false, false );
			relatedTickets.forEach( ( ticket ) => {
				if ( capacity !== null ) {
					const nonNegativeTKTQty = parseInfinity( ticket.qty, false, false );
					const qty = Math.min( nonNegativeDTTCapacity, nonNegativeTKTQty );
					ticket.qty = parseInfinity( qty, true, true );
				}
			} );
		}
	}, [ eventDate ] );
};

export default useEventDateUpdateRelatedTickets;
