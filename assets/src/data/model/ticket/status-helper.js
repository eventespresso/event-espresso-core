/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { MODEL_NAME, TICKET_STATUS_ID } from './constants';

/**
 * @function
 * @param {Object} TicketEntity model object
 * @throws {TypeError}
 */
const assertTicketEntity = ( TicketEntity ) => {
	if ( ! isModelEntityOfModel( TicketEntity, MODEL_NAME ) ) {
		throw new TypeError(
			'The provided entity is not a ticket instance'
		);
	}
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket is currently available for purchase
 */
export const isOnSale = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return ! isArchived( TicketEntity ) &&
		TicketEntity.startDate.diffNow() < 0 &&
		TicketEntity.endDate.diffNow() > 0;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket can no longer be purchased
 */
export const isExpired = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.endDate.diffNow() < 0;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if tickets sold meets or exceeds available quantity
 */
export const isSoldOut = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	const qty = TicketEntity.qty;
	return ( qty !== null && qty !== 'INF' && qty !== Infinity ) &&
		TicketEntity.sold >= qty;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
export const isPending = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return ! isArchived( TicketEntity ) &&
		TicketEntity.startDate.diffNow() > 0;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {boolean} true if ticket is archived
 */
export const isArchived = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.deleted;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} status ID
 */
export const status = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	if ( isArchived( TicketEntity ) ) {
		return TICKET_STATUS_ID.ARCHIVED;
	}
	if ( isSoldOut( TicketEntity ) ) {
		return TICKET_STATUS_ID.SOLD_OUT;
	}
	if ( isExpired( TicketEntity ) ) {
		return TICKET_STATUS_ID.EXPIRED;
	}
	if ( isPending( TicketEntity ) ) {
		return TICKET_STATUS_ID.PENDING;
	}
	if ( isOnSale( TicketEntity ) ) {
		return TICKET_STATUS_ID.ONSALE;
	}
	return '';
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} CSS class corresponding to the background color
 * 					for the ticket container based on the ticket status
 */
export const statusColorClass = ( TicketEntity ) => {
	switch ( status( TicketEntity ) ) {
		case TICKET_STATUS_ID.ONSALE :
			return 'green';
		case TICKET_STATUS_ID.EXPIRED :
			return 'lite-grey';
		case TICKET_STATUS_ID.SOLD_OUT :
			return 'gold';
		case TICKET_STATUS_ID.PENDING :
			return 'blue';
		case TICKET_STATUS_ID.ARCHIVED :
			return 'dark-grey';
	}
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} ticket status
 */
export const getTicketStatusTextLabel = ( TicketEntity ) => {
	let ticketStatus = null;
	switch ( status( TicketEntity ) ) {
		case TICKET_STATUS_ID.SOLD_OUT :
			ticketStatus = __( 'sold out', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.EXPIRED :
			ticketStatus = __( 'expired', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.PENDING :
			ticketStatus = __( 'pending', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.ONSALE :
			ticketStatus = __( 'on sale', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.ARCHIVED :
			ticketStatus = __( 'archived', 'event_espresso' );
			break;
	}
	return ticketStatus;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @return {string}    CSS class for the background color
 */
export const getBackgroundColorClass = ( TicketEntity ) => {
	return `ee-${ statusColorClass( TicketEntity ) }-background`;
};

/**
 * @function
 * @param {Object} TicketEntity model object
 * @param {string} border 'all', 'top', 'right', 'bottom', 'left'
 * @return {string}    CSS class for the background color
 */
export const getBorderColorClass = ( TicketEntity, border = 'all' ) => {
	const color = statusColorClass( TicketEntity );
	switch ( border ) {
		case 'all':
			return `ee-${ color }-border`;
		case 'top':
			return `ee-${ color }-border-top`;
		case 'right':
			return `ee-${ color }-border-right`;
		case 'bottom':
			return `ee-${ color }-border-bottom`;
		case 'left':
			return `ee-${ color }-border-left`;
	}
};
