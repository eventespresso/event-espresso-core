import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketEdge } from '../../types';
import { useTicketsQuery } from '@dataServices/apollo/queries';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();

	return useTicketsQuery<TicketEdge>(options);
};

export default useTickets;
