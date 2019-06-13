/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { ServerDateTime } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { normalizeEntityId } from '@eventespresso/helpers';

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} dateEntity  EE Date object
 * @param {Object} formData
 */
export const dateEntityFormSubmitHandler = (
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
	const getValue = ( field, defaultValue = '' ) => {
		return formData[ `${ prefix }-${ field }` ] || defaultValue;
	};
	dateEntity.name = getValue( 'name' );
	dateEntity.description = getValue( 'description' );
	dateEntity.start = new ServerDateTime( getValue( 'start' ) );
	dateEntity.end = new ServerDateTime( getValue( 'end' ) );
	dateEntity.regLimit = parseInt( getValue( 'reg-limit', -1 ), 10 );
	dateEntity.isPrimary = !! getValue( 'is-primary', false );
	dateEntity.order = parseInt( getValue( 'order', 0 ), 10 );
	dateEntity.parent = normalizeEntityId( getValue( 'parent', 0 ) );
	dateEntity.deleted = !! getValue( 'deleted', false );
};
