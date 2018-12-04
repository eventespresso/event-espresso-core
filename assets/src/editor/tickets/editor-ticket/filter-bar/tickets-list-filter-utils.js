/**
 * External imports
 */
import { filter, first, sortBy } from 'lodash';
import moment from 'moment';

/**
 * filterTickets
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
export const filterTickets = ( tickets, show = 'on-sale-and-pending' ) => {
	console.log( 'filterTickets() show:', show );
	switch ( show ) {
		case 'all' :
			return tickets;
		case 'on-sale-and-pending' :
			return filter(
				tickets,
				function( ticket ) {
					return validStatus( ticket ) &&
						( ticket.status === 'TKO' || ticket.status === 'TKP' );
				}
			);
		case 'on-sale-only' :
			return filter( tickets, { status: 'TKO' } );
		case 'pending-only' :
			return filter( tickets, { status: 'TKP' } );
		case 'next-on-sale-or-pending-only' :
			tickets = filterTickets( tickets );
			tickets = sortTicketsList( tickets );
			return [ first( tickets ) ];
		case 'sold-out-only' :
			return filter(
				tickets,
				function( ticket ) {
					return (
						validStatus( ticket ) && ticket.status === 'TKS'
					) || percentSoldAtOrAbove( ticket, 100 );
				}
			);
		case 'above-90-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 90 );
				}
			);
		case 'above-75-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 75 );
				}
			);
		case 'above-50-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 50 );
				}
			);
		case 'below-50-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldBelow( ticket, 50 );
				}
			);
		case 'expired-only' :
			return filter( tickets, { status: 'TKE' } );
		case 'archived-only' :
			return filter( tickets, { status: 'TKA' } );
	}
	return tickets;
};

/**
 * filterTickets
 * reduces tickets array based on value of the "order" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} order   value for the "order" filter
 * @return {Array}         filtered tickets array
 */
export const sortTicketsList = ( tickets, order = 'chronologically' ) => {
	const now = new moment();
	switch ( order ) {
		case 'chronologically' :
			tickets = sortBy(
				tickets,
				[
					function( ticket ) {
						return now.isBefore( ticket.start );
					},
				]
			);
			break;
		case 'by-name' :
			tickets = sortBy( tickets, [ 'name' ] );
			break;
		case 'by-id' :
			tickets = sortBy( tickets, [ 'id' ] );
			break;
		case 'by-order' :
			tickets = sortBy( tickets, [ 'order' ] );
			break;
	}
	return tickets;
};

/**
 * @param {Object} ticket    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = ( ticket, maxQuantity ) => {
	console.log( 'validSold( ticket )', validSold( ticket ) );
	console.log( 'validFiniteQuantity( ticket )', validFiniteQuantity( ticket ) );
	console.log( 'parseInt( ticket.sold )', parseInt( ticket.sold ) );
	console.log( 'parseInt( ticket.qty )', parseInt( ticket.qty ) );
	console.log( 'maxQuantity/100', maxQuantity / 100 );
	console.log( 'sold/qty', parseInt( ticket.sold ) / parseInt( ticket.qty ) );
	return validSold( ticket ) &&
		validFiniteQuantity( ticket ) &&
		(
			parseInt( ticket.sold ) /
			parseInt( ticket.qty ) >= ( maxQuantity / 100 )
		);
};

/**
 * @param {Object} ticket    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = ( ticket, maxQuantity ) => {
	return (
		validInfiniteQuantity( ticket )
	) || (
		validSold( ticket ) &&
		validFiniteQuantity( ticket ) &&
		(
			parseInt( ticket.sold ) /
			parseInt( ticket.qty ) < ( maxQuantity / 100 )
		)
	);
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if status property is valid
 */
const validStatus = ticket => {
	return typeof ticket.status === 'string';
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid
 */
const validQuantity = ticket => {
	return typeof ticket.qty === 'string' || typeof ticket.qty === 'number';
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = ticket => {
	return validQuantity( ticket ) &&
		ticket.qty !== 'INF' &&
		parseInt( ticket.qty ) > 0;
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = ticket => {
	return validQuantity( ticket ) && ticket.qty === 'INF';
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid
 */
const validSold = ticket => {
	return typeof ticket.sold === 'string' || typeof ticket.sold === 'number';
};
