import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '../../../interfaces/types';
import { useTicketContext } from '../../../hooks';
import { useEditorModal } from '../../../../../application/ui/layout/editorModal';

const EditTicketButton: React.FC<EditItemButtonProps> = (props) => {
	const { id: entityId } = useTicketContext();

	const { openEditor } = useEditorModal();

	const onClick = (): void =>
		openEditor({
			editorId: 'editTicket',
			entityId,
		});

	return (
		<EspressoButton
			icon={<EditOutlined />}
			onClick={onClick}
			tooltip={__('edit ticket')}
			tooltipProps={{ placement: 'left' }}
			{...props}
		/>
	);
};

export default EditTicketButton;
