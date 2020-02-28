import { useDatetimes, useTickets, useDatetimeItem, useTicketItem } from '@edtrServices/apollo/queries';
import { TAMProps, DatesAndTickets } from './types';

/**
 * @todo Use filters for currently visible dates/tickets
 */
const useTAMDatesAndTickets = ({ assignmentType, entityId }: TAMProps): DatesAndTickets => {
	switch (assignmentType) {
		case 'forAll':
			return {
				datetimes: useDatetimes(),
				tickets: useTickets(),
			};
		case 'forDate':
			return {
				datetimes: [useDatetimeItem({ id: entityId })],
				tickets: useTickets(),
			};
		case 'forTicket':
			return {
				tickets: [useTicketItem({ id: entityId })],
				datetimes: useDatetimes(),
			};
	}
};

export default useTAMDatesAndTickets;
