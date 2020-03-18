import React from 'react';

import ErrorMessage from './ErrorMessage';
import { Table } from './table';
import { FilterBar } from '../filters';
import { useDatesAndTickets } from '../data';
import { useDataState } from '../data';

import './style.scss';

const TicketAssignmentsManager: React.FC = () => {
	const datesAndTickets = useDatesAndTickets();
	const dataState = useDataState();

	console.log('datesAndTickets', datesAndTickets);

	return (
		<div id='ticket-assignment-manager'>
			<FilterBar />
			<ErrorMessage dataState={dataState} />
			<Table {...datesAndTickets} />
		</div>
	);
};

export default TicketAssignmentsManager;
