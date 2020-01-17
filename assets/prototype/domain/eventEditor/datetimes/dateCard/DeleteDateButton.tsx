import * as React from 'react';
import { Button } from '@blueprintjs/core';

import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import { ListItemProps } from '../../types';

const DeleteDateButton: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const { deleteEntity } = useEntityMutator(EntityType.Datetime, id);

	return (
		<div
			style={{
				bottom: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right',
			}}
		>
			<Button icon={'trash'} onClick={(): MutationResult => deleteEntity()} minimal />
		</div>
	);
};

export default DeleteDateButton;
