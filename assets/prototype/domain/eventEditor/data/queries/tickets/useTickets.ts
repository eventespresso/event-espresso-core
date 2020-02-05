import { pathOr } from 'ramda';

import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketsList } from '../../types';
import useCacheQuery from '../useCacheQuery';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();
	const { isLoaded } = useStatus();
	const { data } = useCacheQuery<TicketsList>(options);

	if (!isLoaded(TypeName.tickets)) {
		return [];
	}

	return pathOr<Array<Ticket>>([], ['espressoTickets', 'nodes'], data);
};

export default useTickets;
