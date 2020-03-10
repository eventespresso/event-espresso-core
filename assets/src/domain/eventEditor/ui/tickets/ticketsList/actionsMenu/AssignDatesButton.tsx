import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import ItemCount from '@appDisplay/ItemCount';
import { useRelatedDatetimes } from '@edtrServices/apollo/queries';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignDatesButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignDatesToTicket } = useTicketAssignmentsManager();

	const relatedDatetimes = useRelatedDatetimes({
		entity: 'tickets',
		entityId: id,
	});
	const count = relatedDatetimes.length;

	const relatedDatetimeDbIds = relatedDatetimes.map(({ dbId }) => dbId);

	const title = count ? `${__('Related Dates:')} ${relatedDatetimeDbIds.join(', ')}` : '';

	const onClick = (): void => {
		assignDatesToTicket({ ticketId: id });
	};

	return (
		<ItemCount count={count} title={title}>
			<EspressoButton
				icon={Icon.CALENDAR}
				tooltip={__('assign dates')}
				tooltipProps={{ placement: 'right' }}
				onClick={onClick}
				{...rest}
			/>
		</ItemCount>
	);
};

export default AssignDatesButton;
