import { useCallback } from 'react';

import { Datetime } from '@edtrServices/apollo/types';
import useTAMState from '../useTAMState';

type Callback = (datetime: Datetime) => string;

const useRowClassName = (): Callback => {
	const { hasNoAssignedTickets } = useTAMState();

	return useCallback<Callback>(
		(datetime) => {
			const isOrphan = hasNoAssignedTickets({ datetimeId: datetime.id });
			return isOrphan ? 'no-assignments' : '';
		},
		[hasNoAssignedTickets]
	);
};

export default useRowClassName;
