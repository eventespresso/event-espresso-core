/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { dateTimeModel } from '@eventespresso/model';
import { DateTime } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @param {Object} formData
 * @return {Object} updates eventDate
 */
export const eventDateEntityFormSubmitHandler = ( eventDate, formData ) => {
	if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
		return null;
	}
	const id = eventDate.id;
	const prefix = 'ee-event-date';
	eventDate.name = formData[ `${ prefix }-name-${ id }` ] || '';
	eventDate.description = formData[ `${ prefix }-description-${ id }` ] || '';
	eventDate.start = new DateTime( formData[ `${ prefix }-start-${ id }` ] || '' );
	eventDate.end = new DateTime( formData[ `${ prefix }-end-${ id }` ] || '' );
	eventDate.regLimit = parseInt( formData[ `${ prefix }-reg-limit-${ id }` ] || -1 );
	eventDate.isPrimary = !! formData[ `${ prefix }-is-primary-${ id }` ] || false;
	eventDate.order = parseInt( formData[ `${ prefix }-order-${ id }` ] || 0 );
	eventDate.parent = parseInt( formData[ `${ prefix }-parent-${ id }` ] || 0 );
	eventDate.deleted = !! formData[ `${ prefix }-deleted-${ id }` ] || false;
	const { MODEL_NAME: DATETIME } = dateTimeModel;
	return dispatch( 'eventespresso/core' ).persistEntityRecord(
		DATETIME,
		eventDate
	);
};
