import { parseISO, formatISO } from 'date-fns';

import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

/**
 * @function
 * @param {Object} ticket object
 * @return {boolean} 	true if ticket is not yet available for purchase,
 * 						but will be at some date in the future
 */
const isPending = ({ startDate }: Ticket): boolean => {
	return diff('minutes', parseISO(startDate), parseISO(formatISO(now))) > 0;
};

export default isPending;
