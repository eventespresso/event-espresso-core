/**
 * External dependencies
 */
import { parseISO } from 'date-fns';

import { now } from '../filters';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

const isOnSale = ({ startDate, endDate }: Ticket): boolean => {
	return diff('minutes', parseISO(startDate), now) < 0 && diff('minutes', parseISO(endDate), now) > 0;
};

export default isOnSale;
