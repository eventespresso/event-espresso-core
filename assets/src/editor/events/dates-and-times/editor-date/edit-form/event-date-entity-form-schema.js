/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns an object mapping
 * Event Date Entity properties
 * to form prefixs
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @return {Object} rendered form
 */
export const eventDateEntityFormSchema = ( eventDate ) => {
	if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
		return {};
	}
	const prefix = `ee-event-date-${ eventDate.id }`;
	return {
		[ `${ prefix }-id` ]: eventDate.id,
		[ `${ prefix }-event-id` ]: eventDate.EVT_ID,
		[ `${ prefix }-name` ]: eventDate.name || '',
		[ `${ prefix }-description` ]: eventDate.description || '',
		[ `${ prefix }-start` ]: eventDate.start.toISO(),
		[ `${ prefix }-end` ]: eventDate.end.toISO(),
		[ `${ prefix }-reg-limit` ]: stripInfinity( eventDate.regLimit ),
		[ `${ prefix }-sold` ]: eventDate.sold || 0,
		[ `${ prefix }-reserved` ]: eventDate.reserved || 0,
		[ `${ prefix }-is-primary` ]: eventDate.isPrimary || false,
		[ `${ prefix }-order` ]: eventDate.order || 0,
		[ `${ prefix }-parent` ]: eventDate.parent || 0,
		[ `${ prefix }-deleted` ]: eventDate.deleted || false,
	};
};

const stripInfinity = ( number ) => {
	return number !== 'INF' && number !== Infinity && number > 0 ?
		number :
		null;
};
