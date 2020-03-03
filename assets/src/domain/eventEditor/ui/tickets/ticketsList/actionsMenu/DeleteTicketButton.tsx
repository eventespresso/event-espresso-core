import React from 'react';
import { EspressoButton, Icon } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import useDeleteTicketHandler from '../../hooks/useDeleteTicketHandler';
import { ListItemProps } from '@edtrInterfaces/types';

const DeleteTicketButton: React.FC<ListItemProps> = ({ id, ...rest }) => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return (
		<EspressoButton
			icon={Icon.TRASH}
			onClick={handleDeleteTicket}
			tooltip={__('delete ticket')}
			tooltipProps={{ placement: 'left' }}
			{...rest}
		/>
	);
};

export default DeleteTicketButton;
