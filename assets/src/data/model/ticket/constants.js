/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAMES = {
	MODEL: 'ticket',
	RELATION: 'tickets',
};

export const TICKET_STATUS_ID = {
	SOLD_OUT: 'TKS',
	EXPIRED: 'TKE',
	ARCHIVED: 'TKA',
	PENDING: 'TKP',
	ONSALE: 'TKO',
};

export const TICKET_STATUS_IDS = values( TICKET_STATUS_ID );
