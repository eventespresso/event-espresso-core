import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EntityListItemProps } from '@appLayout/entityList';
import ItemCount from '@appDisplay/ItemCount';
import { useRelatedTickets } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignTicketsButton: React.FC<EntityListItemProps> = ({ id }) => {
	const { assignTicketsToDate } = useTicketAssignmentsManager();

	const relatedTickets = useRelatedTickets({
		entity: 'datetimes',
		entityId: id,
	});
	const count = relatedTickets.length;

	const relatedTicketDbIds = relatedTickets.map(({ dbId }) => dbId);

	const title = count
		? `${__('Related Tickets:')} ${relatedTicketDbIds.join(', ')}`
		: __('There are no tickets assigned to this datetime. Please click the ticket icon to update the assignments.');

	const onClick = (): void => {
		assignTicketsToDate({ datetimeId: id });
	};

	return (
		<ItemCount count={count} title={title}>
			<EspressoButton
				icon={Icon.TICKET}
				tooltip={__('assign tickets')}
				tooltipProps={{ placement: 'right' }}
				onClick={onClick}
			/>
		</ItemCount>
	);
};

export default AssignTicketsButton;
