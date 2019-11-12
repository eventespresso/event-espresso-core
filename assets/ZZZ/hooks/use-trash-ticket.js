/**
 * External imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { confirm } = window;

const useTrashTicket = ( ticketEntity ) => {
	const { trashEntityById } = useDispatch( 'eventespresso/core' );
	return useCallback( async () => {
		if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			throw new Error(
				__(
					'Unable to perform deletion because an invalid Ticket Entity was supplied by the Ticket Price Calculator.',
					'event_espresso'
				)
			);
		}
		if ( confirm(
			__(
				'Are you sure you want to delete this ticket?',
				'event_espresso'
			)
		) ) {
			trashEntityById( 'ticket', ticketEntity.id );
		}
	} );
};

export default useTrashTicket;
