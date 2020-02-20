import React from 'react';
import { TagsOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '../../../../../application/ui/input';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useEditorModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <EspressoButton icon={<TagsOutlined />} buttonText={__('Add New Ticket')} onClick={onClick} />;
};

export default AddNewTicketButton;
