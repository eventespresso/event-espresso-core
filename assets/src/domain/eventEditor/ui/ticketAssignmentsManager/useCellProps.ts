import { useCallback } from 'react';

import useTAMState from './useTAMState';
import { AssignmentFnArgs } from './types';

type Callback = (args: AssignmentFnArgs) => React.HTMLAttributes<HTMLElement>;

const useCellProps = (): Callback => {
	const { getAssignmentStatus } = useTAMState();

	return useCallback<Callback>(
		({ datetimeId, ticketId }) => {
			const status = getAssignmentStatus({ datetimeId, ticketId });
			return status ? { className: `${status.toLowerCase()}-assignment` } : {};
		},
		[getAssignmentStatus]
	);
};

export default useCellProps;
