import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import ItemCount from '@appDisplay/ItemCount';
import useRelations from '@appServices/apollo/relations/useRelations';
import useTicketAssignmentsManager from '@edtrUI/ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignDatesButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignDatesToTicket } = useTicketAssignmentsManager();
	const { getRelations } = useRelations();
	const relatedDatetimeIds = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	});
	const count = relatedDatetimeIds.length;
	const onClick = (): void => {
		assignDatesToTicket({ ticketId: id });
	};

	return (
		<ItemCount count={count}>
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
