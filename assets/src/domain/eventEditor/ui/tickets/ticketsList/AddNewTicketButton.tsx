import React from 'react';
import { __ } from '@wordpress/i18n';

import { Calendar } from '@appDisplay/icons';
import { Button } from '@appInputs/index';
import { useFormModal } from '@appLayout/formModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useFormModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <Button buttonText={__('Add New Ticket')} icon={Calendar} onClick={onClick} />;
};

export default AddNewTicketButton;
