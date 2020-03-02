import React from 'react';

import { TAMProps } from './types';
import useTAMDatesAndTickets from './useTAMDatesAndTickets';
import RenderTable from './RenderTable';
import ErrorMessage from './ErrorMessage';
import './styles.scss';

const TicketAssignmentsManager: React.FC<TAMProps> = ({ assignmentType, entityId }) => {
	const datesAndTickets = useTAMDatesAndTickets({ assignmentType, entityId });
	return (
		<>
			<ErrorMessage />
			<RenderTable {...datesAndTickets} />
		</>
	);
};

export default TicketAssignmentsManager;
