import React from 'react';

import ErrorMessage from './ErrorMessage';
import { Table } from './table';
import { FilterBar } from '../filters';
import { useDatesAndTickets } from '../data';

import './style.scss';

const TicketAssignmentsManager: React.FC = () => {
	const datesAndTickets = useDatesAndTickets();

	console.log('datesAndTickets', datesAndTickets);

	return (
		<div id='ticket-assignment-manager'>
			<FilterBar />
			<ErrorMessage />
			<Table {...datesAndTickets} />
		</div>
	);
};

export default TicketAssignmentsManager;
