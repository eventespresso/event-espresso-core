import useTickets from './useTickets';

const useTicketIds = () => {
	const tickets = useTickets();

	return tickets.map(({ id }) => id);
};

export default useTicketIds;
