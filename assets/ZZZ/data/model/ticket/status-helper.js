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
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */
const isValidEntityOrArchive = (ticketEntity, includeArchived) => {
	return (includeArchived && assertTicketEntity(ticketEntity)) || (!includeArchived && !isArchived(ticketEntity));
};

/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} true if tickets sold meets or exceeds available quantity
 */
export const isSoldOut = (ticketEntity, includeArchived = false) => {
	if ((includeArchived && !assertTicketEntity(ticketEntity)) || (!includeArchived && isArchived(ticketEntity))) {
		return false;
	}
	let qty = ticketEntity.qty;
	qty = parseInfinity(qty, true);
	return qty !== Infinity && ticketEntity.sold >= qty;
};

/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out archived entities
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
export const isPending = (ticketEntity, includeArchived = false) => {
	return isValidEntityOrArchive(ticketEntity, includeArchived) && ticketEntity.startDate.diffNow() > 0;
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
