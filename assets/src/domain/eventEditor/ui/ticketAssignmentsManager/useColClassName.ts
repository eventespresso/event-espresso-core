import { useCallback } from 'react';

import { Ticket } from '@edtrServices/apollo/types';
import useTAMState from './useTAMState';

type Callback = (ticket: Ticket) => string;

const useColClassName = (): Callback => {
	const { hasNoAssignedDates } = useTAMState();

	return useCallback<Callback>(
		(ticket) => {
			const isOrphan = hasNoAssignedDates({ ticketId: ticket.id });
			return isOrphan ? 'no-assignments' : '';
		},
		[hasNoAssignedDates]
	);
};

export default useColClassName;
