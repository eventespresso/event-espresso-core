import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '../../../../../application/ui/components/input';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <EspressoButton icon={'tickets-alt'} buttonText={__('Add New Ticket')} onClick={onClick} />;
};

export default AddNewTicketButton;
