import { useEffect } from 'react';

import { useRelations } from '@appServices/apollo/relations';
import useAssignmentManager from './useAssignmentManager';
import useValidateTAMData from './useValidateTAMData';

const useTAMStateManager = () => {
	const { initialize, ...assignmentManager } = useAssignmentManager();

	// The existing relations to be used to create initial data
	// and to calculate difference between new and old data
	const relations = useRelations();
	const unassignedEntities = useValidateTAMData(assignmentManager);

	useEffect(() => {
		// initialize with existing data
		initialize(relations.getData());
	}, []);

	const hasNoAssignedDates = ({ ticketId }) => unassignedEntities.tickets.includes(ticketId);

	const hasNoAssignedTickets = ({ datetimeId }) => unassignedEntities.datetimes.includes(datetimeId);

	return {
		...assignmentManager,
		hasNoAssignedDates,
		hasNoAssignedTickets,
	};
};

export default useTAMStateManager;
