import { useDatetimeItem, useTicketItem } from '@edtrServices/apollo/queries';
import { DatesAndTickets } from '../types';
import { useTAMContext } from '../context';
import useFilteredDatetimes from './useFilteredDatetimes';
import useFilteredTickets from './useFilteredTickets';
import { Datetime, Ticket } from '@edtrServices/apollo';

const useDatesAndTickets = (): DatesAndTickets => {
	const { assignmentType, entity } = useTAMContext();

	const filteredDatetimes = useFilteredDatetimes();
	const filteredTickets = useFilteredTickets();

	const singleDatetime = useDatetimeItem({ id: entity?.id }) || entity as Datetime;
	const singleTicket = useTicketItem({ id: entity?.id }) || entity as Ticket;

	switch (assignmentType) {
		case 'forAll':
			return {
				datetimes: filteredDatetimes,
				tickets: filteredTickets,
			};
		case 'forDate':
			return {
				datetimes: [singleDatetime],
				tickets: filteredTickets,
			};
		case 'forTicket':
			return {
				datetimes: filteredDatetimes,
				tickets: [singleTicket],
			};
	}
};

export default useDatesAndTickets;
