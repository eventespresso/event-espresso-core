import { parseISO } from 'date-fns';

import { now } from '../filters';
import isValidOrTrashed from '../isValidOrTrashed';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

interface Props {
	ticket: Ticket;
	includeTrashed?: boolean;
}

const isExpired = ({ ticket, includeTrashed = false }: Props): boolean => {
	const { endDate } = ticket;

	return isValidOrTrashed(ticket, includeTrashed) && diff('minutes', parseISO(endDate), now) < 0;
};

export default isExpired;
