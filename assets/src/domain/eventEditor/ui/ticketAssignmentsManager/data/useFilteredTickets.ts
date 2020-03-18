import { useTickets } from '@edtrServices/apollo/queries';
import { useFilterState } from '../filters';
import isExpired from '@sharedEntities/tickets/predicates/isExpired';
import { isTrashed } from '@sharedServices/predicates';

const useFilteredTickets = () => {
	const { showExpiredTickets, showTrashedTickets } = useFilterState();
	const tickets = useTickets();

	if (!showExpiredTickets) {
		// `includeTrashed` already takes care of `showTrashedTickets`, so return
		return tickets.filter((ticket) => !isExpired({ ticket, includeTrashed: !showTrashedTickets }));
	}

	if (!showTrashedTickets) {
		return tickets.filter((ticket) => !isTrashed(ticket));
	}

	return tickets;
};

export default useFilteredTickets;
