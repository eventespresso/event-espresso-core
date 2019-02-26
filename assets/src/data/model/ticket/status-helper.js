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
	return TicketEntity.startDate.diffNow() < 0 &&
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
	return TicketEntity.startDate.diffNow() > 0;
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
	if ( isArchived( TicketEntity ) ) {
		return TICKET_STATUS_ID.ARCHIVED;
	}
	return '';
};

/**
 * getBackgroundColorClass
 *
 * @function
 * @param {Object} TicketEntity model object
 * @return {string} CSS class corresponding to the background color
 * 					for the ticket container based on the ticket status
 */
export const getBackgroundColorClass = ( TicketEntity ) => {
	switch ( status( TicketEntity ) ) {
		case TICKET_STATUS_ID.ONSALE :
			return 'ee-green-background';
		case TICKET_STATUS_ID.EXPIRED :
			return 'ee-lt-grey-background';
		case TICKET_STATUS_ID.SOLD_OUT :
			return 'ee-orange-background';
		case TICKET_STATUS_ID.PENDING :
			return 'ee-blue-background';
		case TICKET_STATUS_ID.ARCHIVED :
			return 'ee-violet-background';
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
			ticketStatus = __( 'SOLD OUT', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.EXPIRED :
			ticketStatus = __( 'EXPIRED', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.PENDING :
			ticketStatus = __( 'PENDING', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.ONSALE :
			ticketStatus = __( 'ON SALE', 'event_espresso' );
			break;
		case TICKET_STATUS_ID.ARCHIVED :
			ticketStatus = __( 'ARCHIVED', 'event_espresso' );
			break;
	}
	return ticketStatus;
};
