/**
 * Internal imports
 */
import { parseMoneyValue } from '@eventespresso/utils';

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
