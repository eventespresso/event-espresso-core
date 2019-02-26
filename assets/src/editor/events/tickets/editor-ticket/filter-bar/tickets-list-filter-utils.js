/**
 * External imports
 */

import moment from 'moment-timezone';
import { filter, first, sortBy } from 'lodash';
import { ticketModel } from '@eventespresso/model';


/**
 * filterTickets
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
export const filterTickets = ( tickets, show = 'on-sale-and-pending' ) => {
	switch ( show ) {
		case 'all' :
			return tickets;
		case 'on-sale-and-pending' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isOnSale( ticket ) ||
						ticketModel.isPending( ticket );
				},
			);
		case 'on-sale-only' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isOnSale( ticket );
				},
			);
		case 'pending-only' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isPending( ticket );
				},
			);
		case 'next-on-sale-or-pending-only' :
			tickets = filterTickets( tickets );
			tickets = sortTicketsList( tickets );
			return [ first( tickets ) ];
		case 'sold-out-only' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isSoldOut( ticket ) ||
						percentSoldAtOrAbove( ticket, 100 );
				},
			);
		case 'above-90-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 90 );
				},
			);
		case 'above-75-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 75 );
				},
			);
		case 'above-50-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldAtOrAbove( ticket, 50 );
				},
			);
		case 'below-50-sold' :
			return filter(
				tickets,
				function( ticket ) {
					return percentSoldBelow( ticket, 50 );
				},
			);
		case 'expired-only' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isExpired( ticket );
				},
			);
		case 'archived-only' :
			return filter(
				tickets,
				function( ticket ) {
					return ticketModel.isArchived( ticket );
				},
			);
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
	const now = moment();
	switch ( order ) {
		case 'chronologically' :
			tickets = sortBy(
				tickets,
				[
					function( ticket ) {
						return ticket && ticket.startDate ?
							now.isBefore( ticket.startDate ) :
							true;
					},
				],
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
 * @return {boolean} true if qty property is valid
 */
const validQuantity = ( ticket ) => {
	return typeof ticket.qty === 'string' || typeof ticket.qty === 'number';
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = ( ticket ) => {
	return validQuantity( ticket ) &&
		ticket.qty !== 'INF' &&
		ticket.qty !== Infinity &&
		parseInt( ticket.qty ) > 0;
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = ( ticket ) => {
	return validQuantity( ticket ) && (
		ticket.qty === 'INF' || ticket.qty === Infinity
	);
};

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid
 */
const validSold = ( ticket ) => {
	return typeof ticket.sold === 'string' || typeof ticket.sold === 'number';
};

/**
 * searchTickets
 * reduces tickets array based on value of the "searchDateName" filter
 *
 * @param {Array} tickets 		original tickets array
 * @param {string} searchText 	value for the "searchTicketName" filter
 * @return {Array} 				filtered tickets array
 */
export const searchTickets = ( tickets, searchText = '' ) => {
	return searchText !== '' ?
		tickets.filter( ( ticket ) => {
			return ticket.name.toLowerCase()
				.search( searchText.toLowerCase() ) !== -1;
		} ) :
		tickets;
};
