import { Ticket, TicketEdge } from '../../types';
import { getCacheIds } from '@appServices/predicates';
import { useMemoStringify } from '@appServices/hooks';
import { useTicketsQuery } from '@dataServices/apollo/queries';
import useTicketQueryOptions from './useTicketQueryOptions';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();

	const { data } = useTicketsQuery<TicketEdge>(options);

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default useTickets;
