import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityListItemProps } from '@appLayout/entityList';
import { IconButton } from '@application/ui/input';
import ItemCount from '@appDisplay/ItemCount';
import { Ticket } from '@appDisplay/icons';
import { TypeName } from '@appServices/apollo/status';

import { useRelatedTickets } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

const AssignTicketsButton: React.FC<EntityListItemProps> = React.memo(({ entity }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();

	const relatedTickets = useRelatedTickets({
		entity: 'datetimes',
		entityId: entity.id,
	});
	const count = relatedTickets.length;

	const relatedTicketDbIds = relatedTickets.map(({ dbId }) => dbId);

	const title = count
		? `${__('Related Tickets:')} ${relatedTicketDbIds.join(', ')}`
		: __('There are no tickets assigned to this datetime. Please click the ticket icon to update the assignments.');

	const tooltipProps = { placement: 'right' as 'right' };

	return (
		<>
			<ItemCount count={count} title={title} zeroCountChar='!' emphasizeZero>
				<IconButton icon={Ticket} tooltip={__('assign tickets')} tooltipProps={tooltipProps} onClick={onOpen} />
			</ItemCount>
			<ModalContainer assignmentType='forDate' entity={entity} {...disclosure} />
		</>
	);
});

export default withIsLoaded<EntityListItemProps>(TypeName.tickets, ({ entity, loaded }) => {
	/* Hide TAM unless tickets are loaded */
	return loaded && <AssignTicketsButton entity={entity} />;
});
