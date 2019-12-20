/**
 * @function
 * @param {Object} ticket model object
 * @return {boolean} true if ticket is archived
 */
const isArchived = (ticket) => {
	return ticket.deleted;
};

export default isArchived;
