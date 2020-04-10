import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EntityListItemProps } from '@appLayout/entityList';
import ItemCount from '@appDisplay/ItemCount';
import { useRelatedDatetimes } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

const AssignDatesButton: React.FC<EntityListItemProps> = React.memo(({ entity }) => {
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

	const tooltipProps = { placement: 'right' };

	return (
		<>
			<ItemCount count={count} title={title} zeroCountChar='!' emphasizeZero>
				<EspressoButton
					icon={Icon.CALENDAR}
					tooltip={__('assign dates')}
					tooltipProps={tooltipProps}
					onClick={onOpen}
				/>
			</ItemCount>
			<ModalContainer assignmentType='forTicket' entity={entity} {...disclosure} />
		</>
	);
});

export default withIsLoaded<EntityListItemProps>(TypeName.datetimes, ({ entity, loaded }) => {
	/* Hide TAM unless dates are loaded */
	return loaded && <AssignDatesButton entity={entity} />;
});
