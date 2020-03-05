import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, Icon } from '@application/ui/input';
import { ListItemProps } from '@edtrInterfaces/types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { ConfirmDelete } from '@appLayout/confirmDelete';

const DeleteDateButton: React.FC<ListItemProps> = ({ id, ...rest }) => {
	const { deleteEntity } = useDatetimeMutator(id);

	return (
		<ConfirmDelete onConfirm={() => deleteEntity({ id })}>
			<EspressoButton
				icon={Icon.TRASH}
				tooltip={__('delete datetime')}
				tooltipProps={{ placement: 'right' }}
				{...rest}
			/>
		</ConfirmDelete>
	);
};

export default DeleteDateButton;
