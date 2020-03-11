import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import ItemCount from '@appDisplay/ItemCount';
import { useRelatedTickets } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignTicketsButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
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
				{...rest}
			/>
		</ItemCount>
	);
};

export default AssignTicketsButton;
