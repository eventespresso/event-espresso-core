import useTickets from './useTickets';
import { EntityId } from '@appServices/apollo/types';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	return tickets.map(({ id }) => id);
};

export default useTicketIds;
