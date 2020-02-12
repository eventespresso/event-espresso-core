import { Ticket } from '@edtrServices/apollo/types';
import { isTrashed } from '../../../../services/predicates';

interface Props {
	includeTrashed?: boolean;
	ticket: Ticket;
}

/**
 * @function
 * @param {Object} ticket model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is valid entity or trashed
 */
const isValidOrTrashed = ({ ticket, includeTrashed }: Props): boolean => {
	return includeTrashed || (!includeTrashed && !isTrashed(ticket));
};

export default isValidOrTrashed;
