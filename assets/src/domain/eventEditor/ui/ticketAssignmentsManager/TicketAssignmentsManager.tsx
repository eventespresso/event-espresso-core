import React from 'react';

import ErrorMessage from './ErrorMessage';
import { Table } from './table';
import { TAMProps } from './types';
import useTAMDatesAndTickets from './useTAMDatesAndTickets';

const TicketAssignmentsManager: React.FC<TAMProps> = ({ assignmentType, entityId }) => {
	const datesAndTickets = useTAMDatesAndTickets({ assignmentType, entityId });

	return (
		<>
			<ErrorMessage />
			<Table {...datesAndTickets} />
		</>
	);
};

export default TicketAssignmentsManager;
