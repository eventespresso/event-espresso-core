import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';

const TicketsAssignmentButton: React.FC = () => {
	const { assignToAll } = useTicketAssignmentsManager();

	const onClick = (): void => {
		assignToAll();
	};
	return <EspressoButton icon={'calendar'} buttonText={__('Ticket Assignments')} onClick={onClick} />;
};

export default TicketsAssignmentButton;
