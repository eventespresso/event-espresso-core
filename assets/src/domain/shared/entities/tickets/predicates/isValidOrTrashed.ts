import { Ticket } from '../../../../../../prototype/domain/eventEditor/data/types';
import isTrashed from '../../../predicates/shared/isTrashed';

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
