import React from 'react';
import { EspressoButton } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import useDeleteTicketHandler from '../hooks/useDeleteTicketHandler';
import { ListItemProps } from '../../../interfaces/types';

const DeleteTicketButton: React.FC<ListItemProps> = ({ id, ...rest }) => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return (
		<EspressoButton
			icon='delete'
			onClick={handleDeleteTicket}
			tooltip={__('delete ticket')}
			tooltipProps={{ placement: 'left' }}
			{...rest}
		/>
	);
};

export default DeleteTicketButton;
