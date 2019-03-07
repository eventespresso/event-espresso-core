/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} datetimeEntity  EE Date object
 // * @return {Object} new eventDate
 */
export const trashEventDate = async ( datetimeEntity ) => {
	const { MODEL_NAME: DATETIME } = dateTimeModel;
	if ( ! isModelEntityOfModel( datetimeEntity, DATETIME ) ) {
		return;
	}
	if ( ! window.confirm(
		__(
			'Are you sure you want to delete this Event Date?',
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
		DATETIME,
		datetimeEntity.id
	);
	persistTrashesForModel( DATETIME );
};
