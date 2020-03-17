import { useDatetimes, useTickets, useDatetimeItem, useTicketItem } from '@edtrServices/apollo/queries';
import { TAMProps, DatesAndTickets } from './types';

const useTAMDatesAndTickets = ({ assignmentType, entityId }: TAMProps): DatesAndTickets => {
	const allDatetimes = useDatetimes();
	const allTickets = useTickets();
	const singleDatetime = useDatetimeItem({ id: entityId });
	const singleTicket = useTicketItem({ id: entityId });

	switch (assignmentType) {
		case 'forAll':
			return {
				datetimes: allDatetimes,
				tickets: allTickets,
			};
		case 'forDate':
			return {
				datetimes: [singleDatetime],
				tickets: allTickets,
			};
		case 'forTicket':
			return {
				datetimes: allDatetimes,
				tickets: [singleTicket],
			};
	}
};

export default useTAMDatesAndTickets;
