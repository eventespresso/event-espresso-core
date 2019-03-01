/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { DateTime } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { updateEventDate } from '../action-handlers/update-event-date';

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} eventEntity EE Event object
 * @param {Object} dateEntity  EE Date object
 * @param {Object} formData
 * @return {Promise} updated dateEntity upon resolution
 */
export const eventDateEntityFormSubmitHandler = (
	eventEntity,
	dateEntity,
	formData
) => {
	if ( ! isModelEntityOfModel( dateEntity, DATETIME ) ) {
		throw Error(
			__( 'Unable to process the Event Date Entity form because an' +
				' invalid Date Entity was supplied. ', 'event_espresso' )
		);
	}
	const id = dateEntity.id;
	const prefix = 'ee-event-date';
	dateEntity.name = formData[ `${ prefix }-name-${ id }` ] || '';
	dateEntity.description = formData[ `${ prefix }-description-${ id }` ] ||
		'';
	dateEntity.start = new DateTime(
		formData[ `${ prefix }-start-${ id }` ] || ''
	);
	dateEntity.end = new DateTime(
		formData[ `${ prefix }-end-${ id }` ] || ''
	);
	dateEntity.regLimit = parseInt(
		formData[ `${ prefix }-reg-limit-${ id }` ] || -1
	);
	dateEntity.isPrimary = ! ! formData[ `${ prefix }-is-primary-${ id }` ] ||
		false;
	dateEntity.order = parseInt(
		formData[ `${ prefix }-order-${ id }` ] || 0
	);
	dateEntity.parent = parseInt(
		formData[ `${ prefix }-parent-${ id }` ] || 0
	);
	dateEntity.deleted = ! ! formData[ `${ prefix }-deleted-${ id }` ] ||
		false;
	return updateEventDate( eventEntity, dateEntity );
};
