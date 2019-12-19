import isArchived from './isOnSale';

/**
 * @function
 * @param {Object} ticketEntity model object
 * @param {boolean} includeArchived if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or archive
 */
const isValidEntityOrArchive = (ticketEntity, includeArchived) => {
	return includeArchived || (!includeArchived && !isArchived(ticketEntity));
};

export default isValidEntityOrArchive;
