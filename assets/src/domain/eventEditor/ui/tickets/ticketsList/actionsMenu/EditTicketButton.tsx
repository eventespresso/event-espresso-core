import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '@edtrInterfaces/types';
import { useTicketContext } from '@edtrHooks/index';
import { useEditorModal } from '@appLayout/editorModal';

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
