import React from 'react';

import ErrorMessage from './ErrorMessage';
import { Table } from './table';
import { FilterBar } from '../filters';
import { useDatesAndTickets } from '../data';
import { useDataState } from '../data';

const TicketAssignmentsManager: React.FC = () => {
	const datesAndTickets = useDatesAndTickets();
	const dataState = useDataState();

	return (
		<>
			<FilterBar />
			<ErrorMessage dataState={dataState} />
			<Table {...datesAndTickets} />
		</>
	);
};

export default TicketAssignmentsManager;
