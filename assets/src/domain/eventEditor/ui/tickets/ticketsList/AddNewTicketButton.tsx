import React from 'react';
import { TagsOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@appInputs/index';
import { useFormModal } from '@appLayout/formModal';

const AddNewTicketButton: React.FC = () => {
	const { openEditor } = useFormModal();

	const onClick = (): void => {
		openEditor({
			editorId: 'addTicket',
		});
	};
	return <EspressoButton icon={<TagsOutlined />} buttonText={__('Add New Ticket')} onClick={onClick} />;
};

export default AddNewTicketButton;
