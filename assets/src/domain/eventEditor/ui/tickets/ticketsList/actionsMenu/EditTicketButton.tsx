import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { EditItemButtonProps } from '@edtrInterfaces/types';
import { useTicketContext } from '@edtrHooks/index';
import { useTicketItem } from '@edtrServices/apollo/queries';
import { useFormModal } from '@appLayout/formModal';

const EditTicketButton: React.FC<EditItemButtonProps> = (props) => {
	const { id: entityId } = useTicketContext();
	const { dbId: entityDbId } = useTicketItem({ id: entityId }) || {};

	const { openEditor } = useFormModal();

	const onClick = (): void =>
		openEditor({
			editorId: 'editTicket',
			entityId,
			entityDbId,
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
