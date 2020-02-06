import { Ticket } from '../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../services/predicates';

/**
 * @function
 * @param {Object} ticket model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or trashed
 */
const isValidOrTrashed = (ticket: Ticket, includeTrashed: boolean): boolean => {
	return includeTrashed || (!includeTrashed && !isTrashed(ticket));
};

export default isValidOrTrashed;
