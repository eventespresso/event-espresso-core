import React, { useEffect } from 'react';

import ErrorMessage from './ErrorMessage';
import { Table } from './table';
import { TAMProps } from './types';
import useTAMDatesAndTickets from './useTAMDatesAndTickets';
import useTAMState from './useTAMState';
import { useRelations } from '@appServices/apollo/relations';

const TicketAssignmentsManager: React.FC<TAMProps> = ({ assignmentType, entityId }) => {
	const datesAndTickets = useTAMDatesAndTickets({ assignmentType, entityId });

	const relations = useRelations();
	const { initialize, isInitialized } = useTAMState();

	useEffect(() => {
		if (!isInitialized()) {
			// If TAM is only for a single datetime
			// limit relations to that datetime
			const forDate = assignmentType === 'forDate' ? entityId : null;
			// initialize with existing data
			initialize(relations.getData(), forDate);
		}
	}, [isInitialized()]);

	return (
		<>
			<ErrorMessage />
			<Table {...datesAndTickets} />
		</>
	);
};

export default TicketAssignmentsManager;
