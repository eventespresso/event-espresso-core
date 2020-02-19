import * as React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton } from '@application/ui/input';
import { MutationResult } from '@appServices/apollo/mutations';
import { ListItemProps } from '../../../interfaces/types';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const DeleteDateButton: React.FC<ListItemProps> = ({ id, ...rest }) => {
	const { deleteEntity } = useDatetimeMutator(id);

	return (
		<EspressoButton
			icon='delete'
			tooltip={__('delete datetime')}
			tooltipProps={{ placement: 'right' }}
			onClick={(): MutationResult => deleteEntity({ id })}
			{...rest}
		/>
	);
};

export default DeleteDateButton;
