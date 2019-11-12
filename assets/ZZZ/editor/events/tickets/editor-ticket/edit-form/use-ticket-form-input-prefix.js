/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns Ticket Entity form prefix
 *
 * @function
 * @param {Object} ticketEntity  EE Ticket object
 * @return {Object} rendered form
 */
const useTicketFormInputPrefix = ( ticketEntity ) => useMemo( () => {
	return isModelEntityOfModel( ticketEntity, 'ticket' ) ?
		`ee-ticket-${ ticketEntity.id }` :
		'';
}, [ ticketEntity.id ] );

export default useTicketFormInputPrefix;
