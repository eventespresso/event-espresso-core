/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns an object mapping Ticket Entity properties to form prefixs
 *
 * @function
 * @param {Object} ticketEntity
 * @return {Object} rendered form
 */
export const ticketEntityFormSchema = ( ticketEntity ) => {
	if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
		return {};
	}
	const prefix = `ee-ticket-${ ticketEntity.id }`;
	return {
		[ `${ prefix }-id` ]: ticketEntity.id,
		[ `${ prefix }-name` ]: ticketEntity.name || '',
		[ `${ prefix }-description` ]: ticketEntity.description || '',
		[ `${ prefix }-qty` ]: stripInfinity( ticketEntity.qty ),
		[ `${ prefix }-sold` ]: ticketEntity.sold || 0,
		[ `${ prefix }-reserved` ]: ticketEntity.reserved || 0,
		[ `${ prefix }-uses` ]: stripInfinity( ticketEntity.uses ),
		[ `${ prefix }-required` ]: ticketEntity.required || false,
		[ `${ prefix }-min` ]: ticketEntity.min || null,
		[ `${ prefix }-max` ]: stripInfinity( ticketEntity.max ),
		[ `${ prefix }-price` ]: ticketEntity.price && ticketEntity.price.amount ?
			ticketEntity.price.amount.toNumber() :
			null,
		[ `${ prefix }-startDate` ]: ticketEntity.startDate.toISO(),
		[ `${ prefix }-endDate` ]: ticketEntity.endDate.toISO(),
		[ `${ prefix }-taxable` ]: ticketEntity.taxable || false,
		[ `${ prefix }-order` ]: ticketEntity.order || 0,
		[ `${ prefix }-isDefault` ]: ticketEntity.isDefault || false,
		[ `${ prefix }-wpUser` ]: ticketEntity.wpUser || 0,
		[ `${ prefix }-parent` ]: ticketEntity.parent || 0,
		[ `${ prefix }-deleted` ]: ticketEntity.deleted || false,
	};
};

const stripInfinity = ( number ) => number !== 'INF' || number !== Infinity ?
	number :
	null;
