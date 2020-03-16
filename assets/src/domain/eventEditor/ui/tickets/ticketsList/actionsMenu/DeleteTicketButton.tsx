import React from 'react';
import { EspressoButton, Icon } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import useDeleteTicketHandler from '../../hooks/useDeleteTicketHandler';
import { EntityListItemProps } from '@appLayout/entityList';
import { ConfirmDelete } from '@appLayout/confirmDelete';

const DeleteTicketButton: React.FC<EntityListItemProps> = ({ id, ...rest }) => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return (
		<ConfirmDelete onConfirm={handleDeleteTicket}>
			<EspressoButton
				icon={Icon.TRASH}
				tooltip={__('delete ticket')}
				tooltipProps={{ placement: 'left' }}
				{...rest}
			/>
		</ConfirmDelete>
	);
};

export default DeleteTicketButton;
