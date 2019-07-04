/**
 * External imports
 */
import { filter } from 'lodash';
import { dateTimeModel, ticketModel } from '@eventespresso/model';

const { isTrashed, isExpired: isExpiredDate } = dateTimeModel;
const { isArchived, isExpired: isExpiredTicket } = ticketModel;

/**
 * removes archived and expired dates
 *
 * @function
 * @param {Array} dateEntities
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @return {Array} filtered date entities
 */
export const filterDates = (
	dateEntities,
	showArchivedDates,
	showExpiredDates,
) => {
	return filterExpiredDates(
		filterArchivedDates( dateEntities, showArchivedDates ),
		showExpiredDates
	);
};

/**
 * removes archived and expired tickets
 *
 * @function
 * @param {Array} ticketEntities
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @return {Array} filtered ticket entities
 */
export const filterTickets = (
	ticketEntities,
	showArchivedTickets,
	showExpiredTickets,
) => {
	return filterExpiredTickets(
		filterArchivedTickets( ticketEntities, showArchivedTickets ),
		showExpiredTickets
	);
};

/**
 * removes archived dates
 *
 * @function
 * @param {Array} dateEntities
 * @param {boolean} showArchivedDates
 * @return {Array} filtered date entities
 */
export const filterArchivedDates = ( dateEntities, showArchivedDates ) => {
	return ! showArchivedDates ?
		filter( dateEntities, ( dateEntity ) => {
			return ! isTrashed( dateEntity );
		} ) :
		dateEntities;
};

/**
 * removes expired dates
 *
 * @function
 * @param {Array} dateEntities
 * @param {boolean} showExpiredDates
 * @return {Array} filtered date entities
 */
export const filterExpiredDates = ( dateEntities, showExpiredDates ) => {
	return ! showExpiredDates ?
		filter( dateEntities, ( dateEntity ) => {
			return ! isExpiredDate( dateEntity );
		} ) :
		dateEntities;
};

/**
 * removes archived tickets
 *
 * @function
 * @param {Array} ticketEntities
 * @param {boolean} showArchivedTickets
 * @return {Array} filtered ticket entities
 */
export const filterArchivedTickets = ( ticketEntities, showArchivedTickets ) => {
	return ! showArchivedTickets ?
		filter( ticketEntities, ( ticketEntity ) => {
			return ! isArchived( ticketEntity );
		} ) :
		ticketEntities;
};

/**
 * removes expired tickets
 *
 * @function
 * @param {Array} ticketEntities
 * @param {boolean} showExpiredTickets
 * @return {Array} filtered ticket entities
 */
export const filterExpiredTickets = ( ticketEntities, showExpiredTickets ) => {
	return ! showExpiredTickets ?
		filter( ticketEntities, ( ticketEntity ) => {
			return ! isExpiredTicket( ticketEntity );
		} ) :
		ticketEntities;
};
