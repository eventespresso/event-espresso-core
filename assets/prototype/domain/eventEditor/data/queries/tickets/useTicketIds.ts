import useTickets from './useTickets';
import { EntityId } from '../../types';

const useTicketIds = (): EntityId[] => {
	const tickets = useTickets();

	return tickets.map(({ id }) => id);
};

export default useTicketIds;
