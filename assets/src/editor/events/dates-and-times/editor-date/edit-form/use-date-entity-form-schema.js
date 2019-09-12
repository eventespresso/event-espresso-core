/**
 * External imports
 */
import { parseInfinity } from '@eventespresso/eejs';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import useDateEntityFormInputPrefix from './use-date-entity-form-input-prefix';

/**
 * returns an object mapping
 * Event Date Entity properties
 * to form prefixes
 *
 * @function
 * @param {Object} dateEntity  EE Date object
 * @return {Object} rendered form
 */
const useDateEntityFormSchema = ( dateEntity ) => {
	const prefix = useDateEntityFormInputPrefix( dateEntity );
	if ( ! isModelEntityOfModel( dateEntity, 'datetime' ) ) {
		return {};
	}
	return {
		[ `${ prefix }-id` ]: dateEntity.id,
		[ `${ prefix }-eventId` ]: dateEntity.EVT_ID,
		[ `${ prefix }-name` ]: dateEntity.name || '',
		[ `${ prefix }-description` ]: dateEntity.description || '',
		[ `${ prefix }-start` ]: dateEntity.start.toISO(),
		[ `${ prefix }-end` ]: dateEntity.end.toISO(),
		[ `${ prefix }-startTime` ]: dateEntity.start.toFormat( 'HH:mm' ),
		[ `${ prefix }-endTime` ]: dateEntity.end.toFormat( 'HH:mm' ),
		[ `${ prefix }-regLimit` ]: parseInfinity( dateEntity.regLimit ),
		[ `${ prefix }-sold` ]: dateEntity.sold || 0,
		[ `${ prefix }-reserved` ]: dateEntity.reserved || 0,
		[ `${ prefix }-order` ]: dateEntity.order || 0,
		[ `${ prefix }-parent` ]: dateEntity.parent || 0,
		[ `${ prefix }-deleted` ]: dateEntity.deleted || false,
	};
};

export default useDateEntityFormSchema;
