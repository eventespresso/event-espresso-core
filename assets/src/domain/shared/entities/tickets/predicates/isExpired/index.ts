import { parseISO } from 'date-fns';
import { isNil } from 'ramda';

import { now } from '../filters';
import isValidOrTrashed from '../isValidOrTrashed';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

interface Props {
	ticket: Ticket;
	includeTrashed?: boolean;
}

const isExpired = ({ ticket, includeTrashed = false }: Props): boolean => {
	const validationChecks = !isNil(ticket) && isValidOrTrashed({ ticket, includeTrashed });

	return validationChecks && diff('minutes', parseISO(ticket.endDate), now) < 0;
};

export default isExpired;
