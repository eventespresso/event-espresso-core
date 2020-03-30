import useTickets from './useTickets';
import { EntityId } from '@appServices/apollo/types';
import { getGuids } from '@sharedServices/predicates';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	return getGuids(tickets);
};

export default useTicketIds;
