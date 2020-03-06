import { isNil } from 'ramda';
import { parseISO } from 'date-fns';

import { now } from '../filters';
import { isValidOrTrashed } from '../../../../services/predicates';
import { Ticket } from '@edtrServices/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';

interface Props {
	ticket: Ticket;
	includeTrashed?: boolean;
}

const isExpired = ({ ticket, includeTrashed = false }: Props): boolean => {
	const validationChecks = !isNil(ticket) && isValidOrTrashed(ticket, includeTrashed);

	console.log('validationChecks', validationChecks);

	return validationChecks && diff('minutes', parseISO(ticket.endDate), now) < 0;
};

export default isExpired;
