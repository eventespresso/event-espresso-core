/**
 * External imports
 */
import { Money } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';/**
 * returns an object mapping Ticket Entity properties to form inputs
 *
 * @function
 * @param {Object} ticket
 * @return {Object} rendered form
 */
export const ticketEntityFormSchema = ( ticket ) => {
	if ( ! isModelEntityOfModel( ticket, 'ticket' ) ) {
		return {};
	}
	// console.log( 'ticketEntityFormSchema() ticket', ticket );
	return {
		[ `ee-ticket-id-${ ticket.id }` ]: ticket.id,
		[ `ee-ticket-name-${ ticket.id }` ]: ticket.name || '',
		[ `ee-ticket-description-${ ticket.id }` ]: ticket.description || '',
		[ `ee-ticket-qty-${ ticket.id }` ]: stripInfinity( ticket.qty ),
		[ `ee-ticket-sold-${ ticket.id }` ]: ticket.sold || 0,
		[ `ee-ticket-reserved-${ ticket.id }` ]: ticket.reserved || 0,
		[ `ee-ticket-uses-${ ticket.id }` ]: stripInfinity( ticket.uses ),
		[ `ee-ticket-required-${ ticket.id }` ]: ticket.required || false,
		[ `ee-ticket-min-${ ticket.id }` ]: ticket.min || null,
		[ `ee-ticket-max-${ ticket.id }` ]: stripInfinity( ticket.max ),
		[ `ee-ticket-price-${ ticket.id }` ]: ticket.price.amount &&
		ticket.price.amount.amount ?
			ticket.price.amount.amount.toNumber() :
			null,
		[ `ee-ticket-start-${ ticket.id }` ]: ticket.startDate,
		[ `ee-ticket-end-${ ticket.id }` ]: ticket.endDate,
		[ `ee-ticket-taxable-${ ticket.id }` ]: ticket.taxable || false,
		[ `ee-ticket-order-${ ticket.id }` ]: ticket.order || 0,
		[ `ee-ticket-is-default-${ ticket.id }` ]: ticket.isDefault || false,
		[ `ee-ticket-wp-user-${ ticket.id }` ]: ticket.wpUser || 0,
		[ `ee-ticket-parent-${ ticket.id }` ]: ticket.parent || 0,
		[ `ee-ticket-deleted-${ ticket.id }` ]: ticket.deleted || false,
	};
};

const stripInfinity = ( number ) => number !== 'INF' || number !== Infinity ?
	number :
	null;
