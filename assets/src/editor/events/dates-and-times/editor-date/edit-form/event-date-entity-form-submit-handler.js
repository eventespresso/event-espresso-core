/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { DateTime } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} eventEntity EE Event object
 * @param {Object} dateEntity  EE Date object
 * @param {Object} formData
 */
export const eventDateEntityFormSubmitHandler = (
	eventEntity,
	dateEntity,
	formData,
) => {
	if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
		throw Error(
			__( 'Unable to process the Event Date Entity form because an' +
				' invalid Date Entity was supplied. ', 'event_espresso' )
		);
	}
	const prefix = `ee-event-date-${ dateEntity.id }`;
	dateEntity.name = formData[ `${ prefix }-name` ] || '';
	dateEntity.description = formData[ `${ prefix }-description` ] || '';
	dateEntity.start = new DateTime( formData[ `${ prefix }-start` ] || '' );
	dateEntity.end = new DateTime( formData[ `${ prefix }-end` ] || '' );
	dateEntity.regLimit = parseInt( formData[ `${ prefix }-reg-limit` ] || -1 );
	dateEntity.order = parseInt( formData[ `${ prefix }-order` ] || 0 );
	dateEntity.parent = parseInt( formData[ `${ prefix }-parent` ] || 0 );
	dateEntity.deleted = !! formData[ `${ prefix }-deleted` ] || false;
};
