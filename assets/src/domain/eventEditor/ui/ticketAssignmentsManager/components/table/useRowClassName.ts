import { useCallback } from 'react';

import { Datetime } from '@edtrServices/apollo/types';
import { useDataState } from '../../data';

type Callback = (datetime: Datetime) => string;

const useRowClassName = (): Callback => {
	const { hasNoAssignedTickets } = useDataState();

	return useCallback<Callback>(
		(datetime) => {
			const isOrphan = hasNoAssignedTickets({ datetimeId: datetime.id });
			return isOrphan ? 'no-assignments' : '';
		},
		[hasNoAssignedTickets]
	);
};

export default useRowClassName;
