import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useTicketItem } from '@edtrServices/apollo';

import { TicketMainMenuProps } from './types';
import { isTrashed } from '@sharedServices/predicates';

const TrashTicket: React.FC<TicketMainMenuProps> = ({ id, ...props }) => {
	const ticket = useTicketItem({ id });
	if (!ticket) return null;

	const trashed = isTrashed(ticket);
	const { cacheId } = ticket;

	const { deleteEntity } = useTicketMutator(id);
	const onClick = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);

	const title = trashed ? __('delete permanently') : __('trash ticket');

	return <Trash {...props} onClick={onClick} title={title} />;
};

export default TrashTicket;
