import React from 'react';
import { EspressoButton, Icon } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

import useDeleteTicketHandler from '../../hooks/useDeleteTicketHandler';
import { EntityListItemProps } from '@appLayout/entityList';
import { ConfirmDelete } from '@application/ui/input/confirm';
import { TypeName } from '@appServices/apollo/status';
import withIsLoaded from '@sharedUI/hoc/withIsLoaded';

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

export default withIsLoaded(
	TypeName.datetimes,
	withIsLoaded<EntityListItemProps>(TypeName.prices, ({ loaded, id }) => {
		/* Delete button should be hidden to avoid relational inconsistencies */
		return loaded && <DeleteTicketButton id={id} />;
	})
);
