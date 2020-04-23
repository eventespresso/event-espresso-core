import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

import { TicketMainMenuProps } from './types';

const TrashTicket: React.FC<TicketMainMenuProps> = ({ ticket, ...props }) => {
	if (!ticket) return null;

	const id = ticket.id;
	const { deleteEntity } = useTicketMutator(id);
	const onClick = useCallback(() => deleteEntity({ id }), [id]);

	return <Trash {...props} onClick={onClick} title={__('trash ticket')} />;
};

export default TrashTicket;
