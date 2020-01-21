import isArchived from './isOnSale';

/**
 * @function
 * @param {Object} ticket model object
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */
const isValidEntityOrArchive = (ticket, includeArchived) => {
	return includeArchived || (!includeArchived && !isArchived(ticket));
};

export default isValidEntityOrArchive;
