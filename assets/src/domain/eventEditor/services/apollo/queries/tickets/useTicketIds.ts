import useTickets from './useTickets';
import { EntityId } from '@appServices/apollo/types';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access apollo cache
	return tickets.map(({ id }) => id).sort();
};

export default useTicketIds;
