
import * as React from 'react';
import { Button } from '@blueprintjs/core';
// import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';

// import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';
import useEntityMutator from '../../containers/mutations/useEntityMutator';

const DeleteDateButton = ({ id }) => {
	// const deleteDatetime = useDeleteDatetimeMutation({ eventId, id });
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
			<Button icon={'trash'} onClick={deleteEntity} minimal />
		</div>
	);
};

export default DeleteDateButton;
