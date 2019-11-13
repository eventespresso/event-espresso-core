/**
 * Internal imports
 */
import * as status from './constants';
import { EVENT_STATUS_ID } from '../event';
import { TICKET_STATUS_ID } from '../ticket';
import { DATETIME_STATUS_ID } from '../datetime';
import { CHECKIN_STATUS_ID } from '../checkin';

/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Label } from '@eventespresso/value-objects';
import { isArray } from 'lodash';

/**
 * Translation map for Registration statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_REGISTRATION = {
	[ status.REGISTRATION_STATUS_ID.PENDING_PAYMENT ]: new Label(
		__( 'pending payment', 'event_espresso' ),
		__( 'pending payments', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.APPROVED ]: Label.fromSameSingleAndPlural(
		__( 'approved', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.NOT_APPROVED ]: Label.fromSameSingleAndPlural(
		__( 'not approved', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.CANCELLED ]: Label.fromSameSingleAndPlural(
		__( 'cancelled', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.INCOMPLETE ]: Label.fromSameSingleAndPlural(
		__( 'incomplete', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.DECLINED ]: Label.fromSameSingleAndPlural(
		__( 'declined', 'event_espresso' )
	),
	[ status.REGISTRATION_STATUS_ID.WAIT_LIST ]: new Label(
		__( 'wait list', 'event_espresso' ),
		__( 'wait lists', 'event_espresso' )
	),
};

/**
 * Translation map for Transaction statuses
 * @type {{}}
 *
 */
const STATUS_TRANSLATION_MAP_TRANSACTION = {
	[ status.TRANSACTION_STATUS_ID.OVERPAID ]: Label.fromSameSingleAndPlural(
		__( 'overpaid', 'event_espresso' )
	),
	[ status.TRANSACTION_STATUS_ID.COMPLETE ]: Label.fromSameSingleAndPlural(
		__( 'complete', 'event_espresso' )
	),
	[ status.TRANSACTION_STATUS_ID.INCOMPLETE ]: Label.fromSameSingleAndPlural(
		__( 'incomplete', 'event_espresso' )
	),
	[ status.TRANSACTION_STATUS_ID.FAILED ]: Label.fromSameSingleAndPlural(
		__( 'failed', 'event_espresso' )
	),
	[ status.TRANSACTION_STATUS_ID.ABANDONED ]: Label.fromSameSingleAndPlural(
		__( 'abandoned', 'event_espresso' )
	),
};

/**
 * Translation map for payment statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_PAYMENT = {
	[ status.PAYMENT_STATUS_ID.APPROVED ]: Label.fromSameSingleAndPlural(
		__( 'accepted', 'event_espresso' )
	),
	[ status.PAYMENT_STATUS_ID.PENDING ]: Label.fromSameSingleAndPlural(
		__( 'pending', 'event_espresso' )
	),
	[ status.PAYMENT_STATUS_ID.CANCELLED ]: Label.fromSameSingleAndPlural(
		__( 'cancelled', 'event_espresso' ),
	),
	[ status.PAYMENT_STATUS_ID.DECLINED ]: Label.fromSameSingleAndPlural(
		__( 'declined', 'event_espresso' ),
	),
	[ status.PAYMENT_STATUS_ID.FAILED ]: Label.fromSameSingleAndPlural(
		__( 'failed', 'event_espresso' )
	),
};

/**
 * Translation map for Message statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_MESSAGE = {
	[ status.MESSAGE_STATUS_ID.SENT ]: Label.fromSameSingleAndPlural(
		__( 'sent', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.IDLE ]: Label.fromSameSingleAndPlural(
		__( 'queued for sending', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.FAIL ]: Label.fromSameSingleAndPlural(
		__( 'failed', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.DEBUG ]: Label.fromSameSingleAndPlural(
		__( 'debug only', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.EXECUTING ]: Label.fromSameSingleAndPlural(
		__( 'messenger is executing', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.RESEND ]: Label.fromSameSingleAndPlural(
		__( 'queued for resending', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.INCOMPLETE ]: Label.fromSameSingleAndPlural(
		__( 'queued for generating', 'event_espresso' )
	),
	[ status.MESSAGE_STATUS_ID.RETRY ]: Label.fromSameSingleAndPlural(
		__( 'failed sending, can be retried', 'event_espresso' )
	),
};

/**
 * Translation map for CPT statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_CPT = {
	[ status.CPT_STATUS_ID.PUBLISH ]: Label.fromSameSingleAndPlural(
		__( 'published', 'event_espresso' )
	),
	[ status.CPT_STATUS_ID.FUTURE ]: Label.fromSameSingleAndPlural(
		__( 'scheduled', 'event_espresso' )
	),
	[ status.CPT_STATUS_ID.DRAFT ]: Label.fromSameSingleAndPlural(
		__( 'draft', 'event_espresso' )
	),
	[ status.CPT_STATUS_ID.PENDING ]: Label.fromSameSingleAndPlural(
		__( 'pending', 'event_espresso' )
	),
	[ status.CPT_STATUS_ID.PRIVATE ]: Label.fromSameSingleAndPlural(
		__( 'private', 'event_espresso' )
	),
	[ status.CPT_STATUS_ID.TRASHED ]: Label.fromSameSingleAndPlural(
		__( 'trashed', 'event_espresso' )
	),
};

// the following status maps are for model statuses that are not saved in the
// status table but for convenience have their labels retrievable via here.

/**
 * Translation map for Event Statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_EVENT = {
	[ EVENT_STATUS_ID.SOLD_OUT ]: Label.fromSameSingleAndPlural(
		__( 'sold out', 'event_espresso' )
	),
	[ EVENT_STATUS_ID.POSTPONED ]: Label.fromSameSingleAndPlural(
		__( 'postponed', 'event_espresso' )
	),
	[ EVENT_STATUS_ID.CANCELLED ]: Label.fromSameSingleAndPlural(
		__( 'cancelled', 'event_espresso' )
	),
};

/**
 * Translation map for Ticket statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_TICKET = {
	[ TICKET_STATUS_ID.ARCHIVED ]: Label.fromSameSingleAndPlural(
		__( 'archived', 'event_espresso' )
	),
	[ TICKET_STATUS_ID.EXPIRED ]: Label.fromSameSingleAndPlural(
		__( 'expired', 'event_espresso' )
	),
	[ TICKET_STATUS_ID.SOLD_OUT ]: Label.fromSameSingleAndPlural(
		__( 'sold out', 'event_espresso' )
	),
	[ TICKET_STATUS_ID.PENDING ]: Label.fromSameSingleAndPlural(
		__( 'upcoming', 'event_espresso' )
	),
	[ TICKET_STATUS_ID.ONSALE ]: Label.fromSameSingleAndPlural(
		__( 'on sale', 'event_espresso' )
	),
};

/**
 * Translation map for datetime statuses
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_DATETIME = {
	[ DATETIME_STATUS_ID.CANCELLED ]: Label.fromSameSingleAndPlural(
		__( 'cancelled', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.SOLD_OUT ]: Label.fromSameSingleAndPlural(
		__( 'sold out', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.EXPIRED ]: Label.fromSameSingleAndPlural(
		__( 'expired', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.INACTIVE ]: Label.fromSameSingleAndPlural(
		__( 'inactive', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.UPCOMING ]: Label.fromSameSingleAndPlural(
		__( 'upcoming', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.ACTIVE ]: Label.fromSameSingleAndPlural(
		__( 'active', 'event_espresso' )
	),
	[ DATETIME_STATUS_ID.POSTPONED ]: Label.fromSameSingleAndPlural(
		__( 'postponed', 'event_espresso' )
	),
};

/**
 * Translation map for checkin statuses
 *
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_CHECKIN = {
	[ CHECKIN_STATUS_ID.STATUS_CHECKED_IN ]: new Label(
		__( 'check-in', 'event_espresso' ),
		__( 'check-ins', 'event_espresso' )
	),
	[ CHECKIN_STATUS_ID.STATUS_CHECKED_OUT ]: new Label(
		__( 'check-out', 'event_espresso' ),
		__( 'check-outs', 'event_espresso' )
	),
	[ CHECKIN_STATUS_ID.STATUS_CHECKED_NEVER ]: Label.fromSameSingleAndPlural(
		__( 'never checked in', 'event_espresso' )
	),
};

/**
 * Combined translation map for all statuses.
 * @type {{}}
 */
const STATUS_TRANSLATION_MAP_ALL = {
	...STATUS_TRANSLATION_MAP_REGISTRATION,
	...STATUS_TRANSLATION_MAP_TRANSACTION,
	...STATUS_TRANSLATION_MAP_PAYMENT,
	...STATUS_TRANSLATION_MAP_MESSAGE,
	...STATUS_TRANSLATION_MAP_CPT,
	...STATUS_TRANSLATION_MAP_EVENT,
	...STATUS_TRANSLATION_MAP_TICKET,
	...STATUS_TRANSLATION_MAP_DATETIME,
	...STATUS_TRANSLATION_MAP_CHECKIN,
	[ status.UNKNOWN_STATUS_ID ]: Label.fromSameSingleAndPlural(
		__( 'unknown', 'event_espresso' )
	),
};

/**
 * Returns the pretty status label string for the given arguments.
 *
 * @param {string} statusCode
 * @param {boolean} singular  Whether to return the singular or plural label
 * value
 * @param {(sentence|lower|upper)} schema
 * @return {string} Returns the mapped pretty label for the given status code or
 * a formatted 'unkown' string if there is no mapped value for the given code.
 */
export const prettyStatus = (
	statusCode,
	singular = true,
	schema = Label.FORMAT_SENTENCE_CASE
) => {
	return STATUS_TRANSLATION_MAP_ALL[ statusCode ] ?
		STATUS_TRANSLATION_MAP_ALL[ statusCode ].asFormatted( singular, schema ) :
		STATUS_TRANSLATION_MAP_ALL[ status.UNKNOWN_STATUS_ID ].asFormatted(
			singular,
			schema
		);
};

/**
 * Expects an array of status codes and returns an object indexed by codes with
 * values being the formatted pretty labels for each code according to the
 * provided arguments
 *
 * @param {Array} statusCodes
 * @param {boolean} singular
 * @param {(sentence|lower|upper)} schema
 * @return {Object} An object mapping status code to pretty label.
 */
export const prettyStatuses = (
	statusCodes,
	singular = true,
	schema = Label.FORMAT_SENTENCE_CASE
) => {
	if ( ! isArray( statusCodes ) ) {
		throw new TypeError( 'Expect incoming statusCodes argument' +
			' to be an array' );
	}
	const mappedStatuses = {};
	statusCodes.forEach( ( statusCode ) => {
		mappedStatuses[ statusCode ] = prettyStatus(
			statusCode,
			singular,
			schema
		);
	} );
	return mappedStatuses;
};
