/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { MODEL_NAMES, TICKET_STATUS_ID } from './constants';
import parseInfinity from '../../../utils/parse-infinity';

const { MODEL } = MODEL_NAMES;

/**
 * @function
 * @param {Object} ticketEntity model object
 * @throws {TypeError}
 */
const assertTicketEntity = (ticketEntity) => {
	if (!isModelEntityOfModel(ticketEntity, MODEL)) {
		throw new TypeError('The provided entity is not a ticket instance');
	}
};

/**
 * @function
 * @param {Object} ticketEntity model object
 * @return {boolean} true if ticket is archived
 */
export const isArchived = (ticketEntity) => {
	assertTicketEntity(ticketEntity);
	return ticketEntity.deleted;
};
