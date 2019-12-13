import * as React from 'react';
import { Button } from '@blueprintjs/core';

import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';

const DeleteDateButton = ({ id }) => {
	const { deleteEntity } = useEntityMutator('Datetime', id);

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

export default DeleteDateButton;
