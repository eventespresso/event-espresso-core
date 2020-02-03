import { Ticket } from '../../../../eventEditor/data/types';
import isTrashed from './isTrashed';

/**
 * @function
 * @param {Object} ticket model object
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */
const isValidEntityOrArchive = (ticket: Ticket, includeArchived: boolean): boolean => {
	return includeArchived || (!includeArchived && !isTrashed(ticket));
};

export default isValidEntityOrArchive;
