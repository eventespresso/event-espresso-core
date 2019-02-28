/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns an object mapping
 * Event Date Entity properties
 * to form inputs
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @return {Object} rendered form
 */
export const eventDateEntityFormSchema = ( eventDate ) => {
	if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
		return {};
	}
	const id = eventDate.id;
	const prefix = 'ee-event-date';
	return {
		[ `${ prefix }-id-${ id }` ]: id,
		[ `${ prefix }-event-id-${ id }` ]: eventDate.EVT_ID,
		[ `${ prefix }-name-${ id }` ]: eventDate.name || '',
		[ `${ prefix }-description-${ id }` ]: eventDate.description || '',
		[ `${ prefix }-start-${ id }` ]: eventDate.start.toISO(),
		[ `${ prefix }-end-${ id }` ]: eventDate.end.toISO(),
		[ `${ prefix }-reg-limit-${ id }` ]: stripInf( eventDate.regLimit ),
		[ `${ prefix }-sold-${ id }` ]: eventDate.sold || 0,
		[ `${ prefix }-reserved-${ id }` ]: eventDate.reserved || 0,
		[ `${ prefix }-is-primary-${ id }` ]: eventDate.isPrimary || false,
		[ `${ prefix }-order-${ id }` ]: eventDate.order || 0,
		[ `${ prefix }-parent-${ id }` ]: eventDate.parent || 0,
		[ `${ prefix }-deleted-${ id }` ]: eventDate.deleted || false,
	};
};

const stripInf = ( number ) => {
	return number !== 'INF' && number !== Infinity && number > 0 ?
		number :
		null;
};
