/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: TICKET } = ticketModel;
const { persistEntityRecord } = dispatch( 'eventespresso/core' );

/**
 * @function
 * @param {Object} ticketEntity 	model object defining the ticket
 * @return {Promise} updated dateEntity upon resolution
 */
export const updateTicket = ( ticketEntity ) => {
	return new Promise( function( resolve, reject ) {
		if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
			reject( Error(
				__( 'Unable to process the Ticket Entity form because an' +
					' invalid Ticket Entity was supplied. ', 'event_espresso' )
			) );
		}
		resolve( persistEntityRecord( TICKET, ticketEntity ) );
	} );
};
