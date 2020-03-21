import isExpired from '@sharedEntities/tickets/predicates/isExpired';
import { isTrashed } from '@sharedServices/predicates';
import { useFilterState } from '../filters';
import { useTickets } from '@edtrServices/apollo/queries';

const useFilteredTickets = () => {
	const { showExpiredTickets, showTrashedTickets } = useFilterState();
	let tickets = useTickets();

	if (!showExpiredTickets) {
		tickets = tickets.filter((ticket) => !isExpired(ticket));
	}

	if (!showTrashedTickets) {
		tickets = tickets.filter((ticket) => !isTrashed(ticket));
	}

	return tickets;
};

export default useFilteredTickets;
