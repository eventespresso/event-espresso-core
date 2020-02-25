import { EntityId } from '@edtrServices/apollo/types';

const useTicketRegistrationCount = (ticketId: EntityId): number => {
	// @todo get registration count
	return ticketId.length;
};

export default useTicketRegistrationCount;
