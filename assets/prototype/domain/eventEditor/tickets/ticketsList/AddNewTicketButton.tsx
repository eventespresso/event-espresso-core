import React from 'react';

import { EspressoButton } from '../../../../application/ui/components/input';
import { useEditorModal } from '../../../../application/ui/components/layout/editorModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <EspressoButton icon={'tickets-alt'} buttonText={'Add New Ticket'} onClick={onClick} />;
};

export default AddNewTicketButton;
