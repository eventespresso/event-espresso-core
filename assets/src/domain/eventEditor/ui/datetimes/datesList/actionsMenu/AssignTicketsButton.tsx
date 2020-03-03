import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import useTicketAssignmentsManager from '../../../ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignTicketsButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignTicketsToDate } = useTicketAssignmentsManager();

	const onClick = (): void => {
		assignTicketsToDate({ datetimeId: id });
	};
	return (
		<EspressoButton
			icon={Icon.TICKET_ALT}
			tooltip={__('assign tickets')}
			tooltipProps={{ placement: 'right' }}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default AssignTicketsButton;
