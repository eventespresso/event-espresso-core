/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { dateTimeModel, eventModel } from '@eventespresso/model';
import { DateTime } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { MODEL_NAME: EVENT } = eventModel;
const { createRelation, persistEntityRecord } = dispatch( 'eventespresso/core' );

/**
 * updates Event Date Entity properties
 * given the supplied form data
 *
 * @function
 * @param {Object} eventEntity EE Event object
 * @param {Object} dateEntity  EE Date object
 * @param {Object} formData
 * @return {Object} updates dateEntity
 */
export const eventDateEntityFormSubmitHandler = (
	eventEntity,
	dateEntity,
	formData
) => {
	if ( ! isModelEntityOfModel( eventEntity, EVENT ) ||
		! isModelEntityOfModel( dateEntity, DATETIME )
	) {
		return null;
	}
	const id = dateEntity.id;
	const prefix = 'ee-event-date';
	dateEntity.name = formData[ `${ prefix }-name-${ id }` ] || '';
	dateEntity.description = formData[ `${ prefix }-description-${ id }` ] || '';
	dateEntity.start = new DateTime( formData[ `${ prefix }-start-${ id }` ] || '' );
	dateEntity.end = new DateTime( formData[ `${ prefix }-end-${ id }` ] || '' );
	dateEntity.regLimit = parseInt( formData[ `${ prefix }-reg-limit-${ id }` ] || -1 );
	dateEntity.isPrimary = !! formData[ `${ prefix }-is-primary-${ id }` ] || false;
	dateEntity.order = parseInt( formData[ `${ prefix }-order-${ id }` ] || 0 );
	dateEntity.parent = parseInt( formData[ `${ prefix }-parent-${ id }` ] || 0 );
	dateEntity.deleted = !! formData[ `${ prefix }-deleted-${ id }` ] || false;
	if ( ! dateEntity.EVT_ID ) {
		createRelation(
			EVENT,
			eventEntity.id,
			DATETIME,
			dateEntity
		);
	}
	return persistEntityRecord( DATETIME, dateEntity );
};
