import { EntityId } from '@appServices/apollo/types';

/**
 * A custom hook that holds the registration count of all the tickets.
 */
const useTicketsRegistrationCount = () => {
	// @todo get registration count
	const allTicketsRegistrationsCount = {}; // {ticket.id: RegCount}

	const getRegCount = (ticketId: EntityId): number => {
		return allTicketsRegistrationsCount[ticketId] || 0;
	};

	return { getRegCount };
};

export default useTicketsRegistrationCount;
