/**
 * External imports.
 */
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import useEventDateTickets from './use-event-date-tickets';
import useTriggerTicketUiUpdate from './use-trigger-ticket-ui-update';

/**
 * A custom react hook to update the related ticket entities for the given
 * datetime entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} eventDate  A datetime BaseEntity instance.
 */
const useEventDateUpdateRelatedTickets = ( eventDate ) => {
	const { tickets: relatedTickets, ticketsLoaded } = useEventDateTickets( eventDate );
	const triggerUiUpdate = useTriggerTicketUiUpdate();

	return useCallback( ( mutations = [] ) => {
		if ( ticketsLoaded ) {
			relatedTickets.forEach( ( ticket ) => {
				for ( const mutation of mutations ) {
					if ( typeof mutation === 'function' ) {
						mutation( ticket );
					}
				}
			} );
			triggerUiUpdate();
		}
	}, [ eventDate ] );
};

export default useEventDateUpdateRelatedTickets;
