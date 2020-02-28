import React from 'react';
import { TagsOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { EditItemModalProps } from '@edtrInterfaces/types';
import useTicketAssignmentsManager from '../../../ticketAssignmentsManager/useTicketAssignmentsManager';

const AssignTicketsButton: React.FC<EditItemModalProps> = ({ id, ...rest }) => {
	const { assignTicketsToDate } = useTicketAssignmentsManager();

	const onClick = (): void => {
		assignTicketsToDate({ datetimeId: id });
	};
	return (
		<EspressoButton
			icon={<TagsOutlined />}
			tooltip={__('assign tickets')}
			tooltipProps={{ placement: 'right' }}
			onClick={onClick}
			{...rest}
		/>
	);
};

export default AssignTicketsButton;
