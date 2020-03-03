import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@appInputs/index';
import { useFormModal } from '@appLayout/formModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useFormModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <EspressoButton icon={Icon.CALENDAR} buttonText={__('Add New Ticket')} onClick={onClick} />;
};

export default AddNewTicketButton;
