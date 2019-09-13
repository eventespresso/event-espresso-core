/**
 * Internal imports
 */
import parseMoneyValue from './parse-money-value';

/**
 * @function getTicketTotalFromFormData
 * @param {Object} formData
 * @return {number} total
 */
const getTicketTotalFromFormData = ( formData ) => {
	const total = formData.ticketTotal || 0;
	return parseMoneyValue( total );
};

export default getTicketTotalFromFormData;
