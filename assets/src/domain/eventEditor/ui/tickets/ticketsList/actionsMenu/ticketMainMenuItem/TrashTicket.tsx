import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useTicketContext } from '@edtrHooks/index';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const TrashTicket: React.FC = () => {
	const { id } = useTicketContext();
	const { deleteEntity } = useTicketMutator(id);
	const onClick = useCallback(() => deleteEntity({ id }), [id]);

	return <Trash onClick={onClick} title={__('trash ticket')} />;
};

export default TrashTicket;
