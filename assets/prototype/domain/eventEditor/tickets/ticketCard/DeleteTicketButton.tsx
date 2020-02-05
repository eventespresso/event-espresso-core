import React from 'react';
import { Button } from '@blueprintjs/core/lib/esm';

import useDeleteTicketHandler from '../hooks/useDeleteTicketHandler';
import { ListItemProps } from '../../types';

const DeleteTicketButton: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return <Button icon={'trash'} onClick={handleDeleteTicket} minimal />;
};

export default DeleteTicketButton;
