/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';
const {
	createRelation,
	persistEntityRecord,
} = dispatch( 'eventespresso/core' );

/**
 * @function
 * @param {Object} price 	model object defining the price
 * @param {Object} ticket 	model object defining the ticket
 * @return {Promise} updated dateEntity upon resolution
 */
export const updatePrice = ( price, ticket ) => {
	return new Promise( function( resolve, reject ) {
		if ( ! isModelEntityOfModel( price, 'price' ) ) {
			reject( Error(
				__(
					'Unable to process the Ticket Price Calculator form' +
					' because an invalid Price Entity was supplied. ',
					'event_espresso'
				)
			) );
		}
		if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
			reject( Error(
				__(
					'Unable to process the Ticket Price Calculator form' +
					' because an invalid Ticket Entity was supplied. ',
					'event_espresso'
				)
			) );
		}
	} );
};
