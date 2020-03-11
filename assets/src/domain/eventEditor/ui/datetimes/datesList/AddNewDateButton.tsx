import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';

import { useFormModal } from '@appLayout/formModal';
import useTicketAssignmentsManager from '../../ticketAssignmentsManager/useTicketAssignmentsManager';

const AddNewDateButton: React.FC = () => {
	const { openEditor } = useFormModal();
	const { assignToAll } = useTicketAssignmentsManager();

	const onClickAssignments = (): void => {
		assignToAll();
	};

	const onClickAddNew = (): void => {
		openEditor({
			editorId: 'addDatetime',
		});
	};

	return (
		<div>
			<EspressoButton icon={Icon.CALENDAR} buttonText={__('Add New Date')} onClick={onClickAddNew} />
			<EspressoButton icon={Icon.TICKET} buttonText={__('Ticket Assignments')} onClick={onClickAssignments} />
		</div>
	);
};

export default AddNewDateButton;
