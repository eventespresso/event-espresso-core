import * as React from 'react';
import { Button } from '@blueprintjs/core';

import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';

const DeleteDatetimeButton = ({ id }) => {
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
			<Button icon={'trash'} onClick={() => deleteEntity()} minimal />
		</div>
	);
};

export default DeleteDatetimeButton;
