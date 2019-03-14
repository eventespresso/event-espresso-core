/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} ticketEntity  EE Ticket object
 */
export const trashTicket = async ( ticketEntity ) => {
	const { MODEL_NAME: TICKET } = ticketModel;
	if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
		return;
	}
	if ( ! window.confirm(
		__(
			'Are you sure you want to delete this Ticket?',
			'event_espresso'
		)
	) ) {
		return;
	}
	const {
		trashEntityById,
		persistTrashesForModel,
	} = dispatch( 'eventespresso/core' );
	await trashEntityById(
		TICKET,
		ticketEntity.id
	);
	persistTrashesForModel( TICKET );
};
