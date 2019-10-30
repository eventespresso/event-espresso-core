/**
 * External imports
 */
import { values } from 'lodash';

export const STATUS = 'status';
export const STATUSES = 'statuses';

// types
export const STATUS_TYPE_EMAIL = 'email';
export const STATUS_TYPE_EVENT = 'event';
export const STATUS_TYPE_MESSAGE = 'message';
export const STATUS_TYPE_PAYMENT = 'payment';
export const STATUS_TYPE_REGISTRATION = 'registration';
export const STATUS_TYPE_TRANSACTION = 'transaction';
// email
export const EMAIL_STATUS_ID = {
	DRAFT: 'EDR',
	SENT: 'ESN',
	EXPIRED: 'EXP',
};
// event
export const EVENT_STATUS_ID = {
	ACTIVE: 'ACT',
	REGISTRATION_CLOSED: 'CLS',
	DELETED: 'DEL',
	DENIED: 'DEN',
	DRAFT: 'DRF',
	NOT_ACTIVE: 'NAC',
	NOT_OPEN: 'NOP',
	ONGOING: 'ONG',
	REGISTRATION_OPEN: 'OPN',
	PENDING: 'PND',
	SECONDARY: 'SEC',
};
// message
export const MESSAGE_STATUS_ID = {
	DEBUG: 'MDO',
	EXECUTING: 'MEX',
	FAIL: 'MFL',
	INCOMPLETE: 'MIC',
	IDLE: 'MID',
	RESEND: 'MRS',
	RETRY: 'MRT',
	SENT: 'MSN',
};
// payment
export const PAYMENT_STATUS_ID = {
	APPROVED: 'PAP',
	CANCELLED: 'PCN',
	DECLINED: 'PDC',
	FAILED: 'PFL',
	PENDING: 'PPN',
};
// registration
export const REGISTRATION_STATUS_ID = {
	APPROVED: 'RAP',
	CANCELLED: 'RCN',
	DECLINED: 'RDC',
	INCOMPLETE: 'RIC',
	NOT_APPROVED: 'RNA',
	PENDING_PAYMENT: 'RPP',
	WAIT_LIST: 'RWL',
};
// transaction
export const TRANSACTION_STATUS_ID = {
	ABANDONED: 'TAB',
	COMPLETE: 'TCM',
	FAILED: 'TFL',
	INCOMPLETE: 'TIN',
	OVERPAID: 'TOP',
};

// the following are not in the status database but are kept here for
// convenience

// custom post types
export const CPT_STATUS_ID = {
	PUBLISH: 'publish',
	FUTURE: 'future',
	DRAFT: 'draft',
	PENDING: 'pending',
	PRIVATE: 'private',
	TRASHED: 'trash',
};

export const UNKNOWN_STATUS_ID = 'unknown';

export const ALL_STATUS_IDS = [
	...values( EMAIL_STATUS_ID ),
	...values( EVENT_STATUS_ID ),
	...values( MESSAGE_STATUS_ID ),
	...values( PAYMENT_STATUS_ID ),
	...values( REGISTRATION_STATUS_ID ),
	...values( TRANSACTION_STATUS_ID ),
	...values( CPT_STATUS_ID ),
	UNKNOWN_STATUS_ID,
];
