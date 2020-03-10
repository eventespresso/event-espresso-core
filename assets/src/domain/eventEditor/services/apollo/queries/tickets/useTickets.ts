import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketsList } from '../../types';
import useCacheQuery from '../useCacheQuery';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();
	const { data } = useCacheQuery<TicketsList>(options);

	return data?.espressoTickets?.nodes || [];
};

export default useTickets;
