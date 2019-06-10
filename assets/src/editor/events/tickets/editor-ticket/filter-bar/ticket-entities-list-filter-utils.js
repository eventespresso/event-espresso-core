/**
 * External imports
 */

import moment from 'moment-timezone';
import { filter, first, sortBy } from 'lodash';
import { ticketModel } from '@eventespresso/model';

/**
 * filterTicketEntities
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} ticketEntities    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
export const filterTicketEntities = ( ticketEntities, show = 'on-sale-and-pending' ) => {
	switch ( show ) {
		case 'all' :
			return ticketEntities;
		case 'on-sale-and-pending' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isOnSale( ticketEntity ) ||
						ticketModel.isPending( ticketEntity );
				},
			);
		case 'on-sale-only' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isOnSale( ticketEntity );
				},
			);
		case 'pending-only' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isPending( ticketEntity );
				},
			);
		case 'next-on-sale-or-pending-only' :
			ticketEntities = filterTicketEntities( ticketEntities );
			ticketEntities = sortTicketEntitiesList( ticketEntities );
			return [ first( ticketEntities ) ];
		case 'sold-out-only' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isSoldOut( ticketEntity ) ||
						percentSoldAtOrAbove( ticketEntity, 100 );
				},
			);
		case 'above-90-sold' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return percentSoldAtOrAbove( ticketEntity, 90 );
				},
			);
		case 'above-75-sold' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return percentSoldAtOrAbove( ticketEntity, 75 );
				},
			);
		case 'above-50-sold' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return percentSoldAtOrAbove( ticketEntity, 50 );
				},
			);
		case 'below-50-sold' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return percentSoldBelow( ticketEntity, 50 );
				},
			);
		case 'expired-only' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isExpired( ticketEntity );
				},
			);
		case 'archived-only' :
			return filter(
				ticketEntities,
				function( ticketEntity ) {
					return ticketModel.isArchived( ticketEntity );
				},
			);
	}
	return ticketEntities;
};

/**
 * filterTicketEntities
 * reduces tickets array based on value of the "order" filter
 *
 * @param {Array} ticketEntities    original tickets array
 * @param {string} order   value for the "order" filter
 * @return {Array}         filtered tickets array
 */
export const sortTicketEntitiesList = ( ticketEntities, order = 'chronologically' ) => {
	const now = moment();
	switch ( order ) {
		case 'chronologically' :
			ticketEntities = sortBy(
				ticketEntities,
				[
					function( ticketEntity ) {
						return ticketEntity && ticketEntity.startDate ?
							now.isBefore( ticketEntity.startDate ) :
							true;
					},
				],
			);
			break;
		case 'by-name' :
			ticketEntities = sortBy( ticketEntities, [ 'name' ] );
			break;
		case 'by-id' :
			ticketEntities = sortBy( ticketEntities, [ 'id' ] );
			break;
		case 'by-order' :
			ticketEntities = sortBy( ticketEntities, [ 'order' ] );
			break;
	}
	return ticketEntities;
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = ( ticketEntity, maxQuantity ) => {
	return validSold( ticketEntity ) &&
		validFiniteQuantity( ticketEntity ) &&
		(
			parseInt( ticketEntity.sold, 10 ) /
			parseInt( ticketEntity.qty, 10 ) >= ( maxQuantity / 100 )
		);
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = ( ticketEntity, maxQuantity ) => {
	return (
		validInfiniteQuantity( ticketEntity )
	) || (
		validSold( ticketEntity ) &&
		validFiniteQuantity( ticketEntity ) &&
		(
			parseInt( ticketEntity.sold, 10 ) /
			parseInt( ticketEntity.qty, 10 ) < ( maxQuantity / 100 )
		)
	);
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid
 */
const validQuantity = ( ticketEntity ) => {
	return typeof ticketEntity.qty === 'string' || typeof ticketEntity.qty === 'number';
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = ( ticketEntity ) => {
	return validQuantity( ticketEntity ) &&
		ticketEntity.qty !== 'INF' &&
		ticketEntity.qty !== Infinity &&
		parseInt( ticketEntity.qty, 10 ) > 0;
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = ( ticketEntity ) => {
	return validQuantity( ticketEntity ) && (
		ticketEntity.qty === 'INF' || ticketEntity.qty === Infinity
	);
};

/**
 * @param {Object} ticketEntity    event ticket object
 * @return {boolean} true if qty property is valid
 */
const validSold = ( ticketEntity ) => {
	return typeof ticketEntity.sold === 'string' || typeof ticketEntity.sold === 'number';
};

/**
 * searchTicketEntities
 * reduces tickets array based on value of the "searchDateName" filter
 *
 * @param {Array} ticketEntities 		original tickets array
 * @param {string} searchText 	value for the "searchTicketName" filter
 * @return {Array} 				filtered tickets array
 */
export const searchTicketEntities = ( ticketEntities, searchText = '' ) => {
	return searchText !== '' ?
		ticketEntities.filter( ( ticketEntity ) => {
			return ticketEntity.name.toLowerCase()
				.search( searchText.toLowerCase() ) !== -1;
		} ) :
		ticketEntities;
};
