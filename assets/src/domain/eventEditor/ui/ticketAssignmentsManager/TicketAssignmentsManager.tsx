import React from 'react';

import { TAMProps } from './types';
import { TAMProvider } from './TAMProvider';
import useTAMState from './useTAMState';

const TicketAssignmentsManager: React.FC<TAMProps> = ({ assignmentType, entityId }) => {
	return (
		<TAMProvider>
			<span>
				{assignmentType}: {entityId} <TestComponent entityId={entityId} />
			</span>
		</TAMProvider>
	);
};

const TestComponent = ({ entityId }) => {
	const { getAssignedTickets } = useTAMState();
	return (
		<span>
			The Date is related to these tickets: {JSON.stringify(getAssignedTickets({ datetimeId: entityId }))}
		</span>
	);
};

export default TicketAssignmentsManager;
