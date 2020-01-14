
import isTrashed from './isTrashed';

/**
 * @function
 * @param {Object} ticket model object
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */
const isValidEntityOrArchive = (ticket, includeArchived) => {
	return includeArchived || (!includeArchived && !isTrashed(ticket));
};

export default isValidEntityOrArchive;
