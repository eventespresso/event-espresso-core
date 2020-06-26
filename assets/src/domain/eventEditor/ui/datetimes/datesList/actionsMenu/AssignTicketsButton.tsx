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
import { Datetime } from '@edtrServices/apollo';
import { useMemoStringify } from '@application/services/hooks';
import { TooltipProps } from '@infraUI/display';

const AssignTicketsButton: React.FC<EntityListItemProps<Datetime>> = React.memo(({ entity }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();

	const relatedTickets = useRelatedTickets({
		entity: 'datetimes',
		entityId: entity.id,
	});

	const count = relatedTickets.length;

	const title = count
		? `${__('Number of related tickets:')} ${count}`
		: __('There are no tickets assigned to this datetime. Please click the ticket icon to update the assignments.');

	const tooltipProps = useMemoStringify<TooltipProps>({ placement: 'right' });

	return (
		<>
			<ItemCount count={count} emphasizeZero title={title} zeroCountChar='!'>
				<IconButton
					borderless
					icon={Ticket}
					onClick={onOpen}
					tooltip={__('assign tickets')}
					tooltipProps={tooltipProps}
				/>
			</ItemCount>
			<ModalContainer assignmentType='forDate' entity={entity} {...disclosure} />
		</>
	);
});

export default withIsLoaded<EntityListItemProps<Datetime>>(TypeName.tickets, ({ entity, loaded }) => {
	/* Hide TAM unless tickets are loaded */
	return loaded && <AssignTicketsButton entity={entity} />;
});
