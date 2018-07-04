/**
 * External imports
 */
import { values } from 'lodash';

export const MODEL_NAME = 'status';
// types
export const STATUS_TYPE_EMAIL = 'email';
export const STATUS_TYPE_EVENT = 'event';
export const STATUS_TYPE_MESSAGE = 'message';
export const STATUS_TYPE_PAYMENT = 'payment';
export const STATUS_TYPE_REGISTRATION = 'registration';
export const STATUS_TYPE_TRANSACTION = 'transaction';
// email
export const emailStatus = {
	DRAFT: 'EDR',
	SENT: 'ESN',
	EXPIRED: 'EXP',
};
// event
export const eventStatus = {
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
export const messageStatus = {
	DEBUG: 'MDO',
	EXECUTING: 'MEX',
	FAIL: 'MFL',
	INCOMPLETE: 'MIC',
	IDLE: 'MID',
	RESEND: 'MRS',
	SENT: 'MSN',
};
// payment
export const paymentStatus = {
	APPROVED: 'PAP',
	CANCELLED: 'PCN',
	DECLINED: 'PDC',
	FAILED: 'PFL',
	PENDING: 'PPN',
};
// registration
export const registrationStatus = {
	APPROVED: 'RAP',
	CANCELLED: 'RCN',
	DECLINED: 'RDC',
	INCOMPLETE: 'RIC',
	NOT_APPROVED: 'RNA',
	PENDING_PAYMENT: 'RPP',
	WAIT_LIST: 'RWL',
};
// transaction
export const transactionStatus = {
	ABANDONED: 'TAB',
	COMPLETE: 'TCM',
	FAILED: 'TFL',
	INCOMPLETE: 'TIN',
	OVERPAID: 'TOP',
};

export const ALL_STATUSES = [
	...values( emailStatus ),
	...values( eventStatus ),
	...values( messageStatus ),
	...values( paymentStatus ),
	...values( registrationStatus ),
	...values( transactionStatus ),
];
