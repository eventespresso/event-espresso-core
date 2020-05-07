import useTickets from './useTickets';
import { EntityId } from '@dataServices/types';
import { getGuids } from '@appServices/predicates';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	return getGuids(tickets);
};

export default useTicketIds;
