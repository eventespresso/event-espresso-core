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
 * @return {Object} new eventDate
 */
export const trashEventDate = async ( datetimeEntity ) => {
	const { MODEL_NAME: DATETIME } = dateTimeModel;
	if ( ! isModelEntityOfModel( datetimeEntity, DATETIME ) ) {
		return null;
	}
	if ( ! window.confirm(
		__(
			'Are you sure you want to delete this Event Date?',
			'event_espresso'
		)
	) ) {
		return null;
	}
	return await dispatch( 'eventespresso/core' ).trashEntityById(
		DATETIME,
		datetimeEntity.id
	);
};
