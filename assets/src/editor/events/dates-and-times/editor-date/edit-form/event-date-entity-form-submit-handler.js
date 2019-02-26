/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
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
export const eventDateEntityFormSubmitHandler = async ( eventDate, formData ) => {
	if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
		return null;
	}
	const id = eventDate.id;
	const prefix = 'ee-event-date';
	const startDate = formData[ `${ prefix }-start-${ id }` ];
	const endDate = formData[ `${ prefix }-end-${ id }` ];
	eventDate.name = formData[ `${ prefix }-name-${ id }` ];
	eventDate.description = formData[ `${ prefix }-description-${ id }` ];
	eventDate.start = new DateTime( startDate );
	eventDate.end = new DateTime( endDate );
	eventDate.regLimit = parseInt( formData[ `${ prefix }-reg-limit-${ id }` ] );
	eventDate.isPrimary = formData[ `${ prefix }-is-primary-${ id }` ];
	eventDate.order = parseInt( formData[ `${ prefix }-order-${ id }` ] );
	eventDate.parent = parseInt( formData[ `${ prefix }-parent-${ id }` ] );
	eventDate.deleted = formData[ `${ prefix }-deleted-${ id }` ];
	return await dispatch( 'eventespresso/core' ).persistDatetimeRecord(
		eventDate
	);
};
