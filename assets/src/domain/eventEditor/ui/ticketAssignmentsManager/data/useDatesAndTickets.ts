import { DatesAndTickets } from '../types';
import { useTAMContext } from '../context';
import useFilteredDatetimes from './useFilteredDatetimes';
import useFilteredTickets from './useFilteredTickets';
import { Datetime, Ticket } from '@edtrServices/apollo';

const useDatesAndTickets = (): DatesAndTickets => {
	const { assignmentType, entity } = useTAMContext();

	const filteredDatetimes = useFilteredDatetimes();
	const filteredTickets = useFilteredTickets();

	switch (assignmentType) {
		case 'forAll':
			return {
				datetimes: filteredDatetimes,
				tickets: filteredTickets,
			};
		case 'forDate':
			return {
				datetimes: [entity as Datetime],
				tickets: filteredTickets,
			};
		case 'forTicket':
			return {
				datetimes: filteredDatetimes,
				tickets: [entity as Ticket],
			};
	}
};

export default useDatesAndTickets;
