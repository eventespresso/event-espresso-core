import { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { isTrashed } from '@sharedServices/predicates';
import { useTicketItem } from '@edtrServices/apollo';
import useDeleteTicketHandler from '@edtrUI/tickets/hooks/useDeleteTicketHandler';
import useCopyTicket from './useCopyTicket';

const useActions = ({ ticketId }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const ticket = useTicketItem({ id: ticketId });

	const deleteTicket = useDeleteTicketHandler(ticketId);

	const trashed = isTrashed(ticket);

	const trashTicket = useCallback(() => deleteTicket(trashed), [trashed]);

	const copyTicket = useCopyTicket(ticket);

	return useMemo(
		() => ({
			copyTicket,
			trashTicket,
			trashed,
		}),
		[copyTicket, trashTicket, trashed]
	);
};

export default useActions;
