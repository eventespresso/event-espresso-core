/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * returns an object mapping Ticket Entity properties to form prefixs
 *
 * @function
 * @param {Object} ticket
 * @return {Object} rendered form
 */
export const ticketEntityFormSchema = ( ticket ) => {
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return {};
	}
	const prefix = `ee-ticket-${ ticket.id }`;
	// console.log( 'ticketEntityFormSchema() ticket', ticket );
	return {
		[ `${ prefix }-id` ]: ticket.id,
		[ `${ prefix }-name` ]: ticket.name || '',
		[ `${ prefix }-description` ]: ticket.description || '',
		[ `${ prefix }-qty` ]: stripInfinity( ticket.qty ),
		[ `${ prefix }-sold` ]: ticket.sold || 0,
		[ `${ prefix }-reserved` ]: ticket.reserved || 0,
		[ `${ prefix }-uses` ]: stripInfinity( ticket.uses ),
		[ `${ prefix }-required` ]: ticket.required || false,
		[ `${ prefix }-min` ]: ticket.min || null,
		[ `${ prefix }-max` ]: stripInfinity( ticket.max ),
		[ `${ prefix }-price` ]: ticket.price && ticket.price.amount ?
			ticket.price.amount.toNumber() :
			null,
		[ `${ prefix }-start` ]: ticket.startDate.toISO(),
		[ `${ prefix }-end` ]: ticket.endDate.toISO(),
		[ `${ prefix }-taxable` ]: ticket.taxable || false,
		[ `${ prefix }-order` ]: ticket.order || 0,
		[ `${ prefix }-is-default` ]: ticket.isDefault || false,
		[ `${ prefix }-wp-user` ]: ticket.wpUser || 0,
		[ `${ prefix }-parent` ]: ticket.parent || 0,
		[ `${ prefix }-deleted` ]: ticket.deleted || false,
	};
};

const stripInfinity = ( number ) => number !== 'INF' || number !== Infinity ?
	number :
	null;
