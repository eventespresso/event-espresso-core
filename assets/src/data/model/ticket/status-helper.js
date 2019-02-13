/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { MODEL_NAME, TICKET_STATUS_ID } from './constants';

const assertTicketEntity = ( TicketEntity ) => {
	if ( ! isModelEntityOfModel( TicketEntity, MODEL_NAME ) ) {
		throw new TypeError(
			'The provided entity is not a ticket instance'
		);
	}
};

export const isOnSale = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.startDate.diffNow() < 0 &&
		TicketEntity.endDate.diffNow() > 0;
};

export const isExpired = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.endDate.diffNow() < 0;
};

export const isSoldOut = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.sold >= TicketEntity.qty;
};

export const isPending = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.startDate.diffNow() > 0;
};

export const isArchived = ( TicketEntity ) => {
	assertTicketEntity( TicketEntity );
	return TicketEntity.deleted;
};

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
	return null;

};
