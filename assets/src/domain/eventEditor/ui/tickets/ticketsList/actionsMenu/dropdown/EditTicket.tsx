import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useFormModal } from '@appLayout/formModal';

import { TicketMainMenuProps } from './types';

const EditTicket: React.FC<TicketMainMenuProps> = ({ ticket, ...props }) => {
	const { openEditor } = useFormModal();
	const onClick = useCallback(
		() =>
			openEditor({
				editorId: 'editTicket',
				entityId: ticket.id,
				entityDbId: ticket.dbId,
			}),
		[ticket.id]
	);

	return <Edit {...props} onClick={onClick} title={__('edit ticket')} />;
};

export default EditTicket;
