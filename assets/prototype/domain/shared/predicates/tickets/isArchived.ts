/**
 * @function
 * @param {Object} ticketEntity model object
 * @return {boolean} true if ticket is archived
 */
const isArchived = (ticketEntity) => {
	return ticketEntity.deleted;
};

export default isArchived;
