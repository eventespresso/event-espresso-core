import { useDatetimeItem, useTicketItem } from '@edtrServices/apollo/queries';
import { DatesAndTickets } from '../types';
import { useTAMContext } from '../context';
import useFilteredDatetimes from './useFilteredDatetimes';
import useFilteredTickets from './useFilteredTickets';

const useDatesAndTickets = (): DatesAndTickets => {
	const { assignmentType, entityId } = useTAMContext();

	const filteredDatetimes = useFilteredDatetimes();
	const filteredTickets = useFilteredTickets();

	const singleDatetime = useDatetimeItem({ id: entityId });
	const singleTicket = useTicketItem({ id: entityId });

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
