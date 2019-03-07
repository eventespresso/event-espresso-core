/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel, eventModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;
const { createRelation, persistEntityRecord } = dispatch( 'eventespresso/core' );

/**
 * persists Event Date Entity changes to the server
 * and updates relation to Event if necessary
 *
 * @function
 * @param {Object} eventEntity EE Event object
 * @param {Object} dateEntity  EE Date object
 * @return {Promise} updated dateEntity upon resolution
 */
export const updateEventDate = ( eventEntity, dateEntity ) => {
	return new Promise( function( resolve, reject ) {
		if ( ! isModelEntityOfModel( eventEntity, EVENT ) ) {
			reject( Error(
				__( 'Unable to process the Event Date Entity form because an' +
					' invalid Event Entity was supplied. ', 'event_espresso' )
			) );
		}
		if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
			reject( Error(
				__( 'Unable to process the Event Date Entity form because an' +
					' invalid Date Entity was supplied. ', 'event_espresso' )
			) );
		}
		if ( ! dateEntity.EVT_ID ) {
			createRelation(
				EVENT,
				eventEntity.id,
				DATETIME,
				dateEntity
			);
		}
		resolve( persistEntityRecord( DATETIME, dateEntity ) );
	} );
};
