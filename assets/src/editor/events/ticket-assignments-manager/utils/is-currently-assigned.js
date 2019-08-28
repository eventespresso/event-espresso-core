/**
 * used to determine if we are adding or removing a ticket assignment
 *
 * @function
 * @param {boolean} hasTicket
 * @param {boolean} isAssigned
 * @param {boolean} isRemoved
 * @return {boolean} true if ticket is currently assigned to event date
 */
const isCurrentlyAssigned = (
	hasTicket,
	isAssigned,
	isRemoved
) => isAssigned || ( hasTicket && ! isRemoved );

export default isCurrentlyAssigned;
