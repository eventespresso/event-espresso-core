import React from 'react';

import { TAMProps } from './types';
import useTAMDatesAndTickets from './useTAMDatesAndTickets';
import RenderTable from './RenderTable';
import './styles.scss';

const TicketAssignmentsManager: React.FC<TAMProps> = ({ assignmentType, entityId }) => {
	const datesAndTickets = useTAMDatesAndTickets({ assignmentType, entityId });
	return <RenderTable {...datesAndTickets} />;
};

export default TicketAssignmentsManager;
