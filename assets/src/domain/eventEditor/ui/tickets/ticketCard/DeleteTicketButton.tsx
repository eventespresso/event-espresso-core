import React from 'react';
import { EspressoButton } from '@application/ui/input';

import useDeleteTicketHandler from '../hooks/useDeleteTicketHandler';
import { ListItemProps } from '../../../interfaces/types';

const DeleteTicketButton: React.FC<ListItemProps> = ({ id }) => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return <EspressoButton icon='delete' onClick={handleDeleteTicket} />;
};

export default DeleteTicketButton;
