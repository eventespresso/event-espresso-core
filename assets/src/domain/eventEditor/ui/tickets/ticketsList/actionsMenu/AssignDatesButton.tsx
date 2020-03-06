import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import useTicketAssignmentsManager from '../../../ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignDatesButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignDatesToTicket } = useTicketAssignmentsManager();

	const onClick = (): void => {
		assignDatesToTicket({ ticketId: id });
	};
	return (
		<EspressoButton
			icon={Icon.CALENDAR}
			tooltip={__('assign dates')}
			tooltipProps={{ placement: 'left' }}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default AssignDatesButton;
