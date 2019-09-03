/**
 * @function getTicketIdFromFormData
 * @param {Object} formData
 * @return {number|string} ticketId
 */
const getTicketIdFromFormData = ( formData ) => formData.ticketID || 0;

export default getTicketIdFromFormData;
