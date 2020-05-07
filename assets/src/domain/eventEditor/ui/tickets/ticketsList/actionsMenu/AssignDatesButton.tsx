import React from 'react';
import { __ } from '@wordpress/i18n';

import { Calendar } from '@appDisplay/icons';
import { IconButton } from '@application/ui/input';
import { EntityListItemProps } from '@appLayout/entityList';
import ItemCount from '@appDisplay/ItemCount';
import { useRelatedDatetimes } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';
import { Ticket } from '@edtrServices/apollo';

const AssignDatesButton: React.FC<EntityListItemProps<Ticket>> = React.memo(({ entity }) => {
	const { ModalContainer, onOpen, ...disclosure } = useTicketAssignmentsManager();

	const relatedDatetimes = useRelatedDatetimes({
		entity: 'tickets',
		entityId: entity.id,
	});
	const count = relatedDatetimes.length;

	const relatedDatetimeDbIds = relatedDatetimes.map(({ dbId }) => dbId);

	const title = count
		? `${__('Related Dates:')} ${relatedDatetimeDbIds.join(', ')}`
		: __(
				'There are no event dates assigned to this ticket. Please click the calendar icon to update the assignments.'
		  );

	const tooltipProps = { placement: 'right' as 'right' };

	return (
		<>
			<ItemCount count={count} title={title} zeroCountChar='!' emphasizeZero>
				<IconButton
					icon={Calendar}
					tooltip={__('assign dates')}
					tooltipProps={tooltipProps}
					onClick={onOpen}
					variant='ghost'
				/>
			</ItemCount>
			<ModalContainer assignmentType='forTicket' entity={entity} {...disclosure} />
		</>
	);
});

export default withIsLoaded<EntityListItemProps<Ticket>>(TypeName.datetimes, ({ entity, loaded }) => {
	/* Hide TAM unless dates are loaded */
	return loaded && <AssignDatesButton entity={entity} />;
});
