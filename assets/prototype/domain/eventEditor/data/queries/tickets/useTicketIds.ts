import useTickets from './useTickets';
import { Ticket, EntityId } from '../../types';

const useTicketIds = (): EntityId[] => {
	const tickets: Ticket[] = useTickets();

	return tickets.map(({ id }) => id);
};

export default useTicketIds;
