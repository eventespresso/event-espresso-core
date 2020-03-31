import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Edit } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useTicketContext } from '@edtrHooks/index';
import { useTicketItem } from '@edtrServices/apollo/queries';
import { useFormModal } from '@appLayout/formModal';

const EditTicket: React.FC = (props) => {
	const { id } = useTicketContext();
	const ticket = useTicketItem({ id });
	const { openEditor } = useFormModal();
	const onClick = useCallback(
		() =>
			openEditor({
				editorId: 'editTicket',
				entityId: id,
				entityDbId: ticket.dbId,
			}),
		[id]
	);

	return <Edit {...props} onClick={onClick} title={__('edit ticket')} />;
};

export default EditTicket;
