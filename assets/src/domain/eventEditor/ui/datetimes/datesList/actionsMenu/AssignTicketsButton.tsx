import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import ItemCount from '@appDisplay/ItemCount';
import useRelations from '@appServices/apollo/relations/useRelations';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignTicketsButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignTicketsToDate } = useTicketAssignmentsManager();
	const { getRelations } = useRelations();
	const relatedTicketIds = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	});
	const count = relatedTicketIds.length;
	const onClick = (): void => {
		assignTicketsToDate({ datetimeId: id });
	};

	return (
		<ItemCount count={count}>
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
