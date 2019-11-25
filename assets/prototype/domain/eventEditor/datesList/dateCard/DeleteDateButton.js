import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';
import { Button } from '@blueprintjs/core/lib/esm';

const DeleteDateButton = ({ datetimeId }) => {
	const { deleteDate } = useDeleteDatetimeMutation();
	const variables = { input: { clientMutationId: 'xyz', id: datetimeId } };

	return (
		<div
			style={{
				bottom: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right'
			}}
		>
			<Button
				icon={'trash'}
				onClick={() => {
					try {
						deleteDate({ variables });
					} catch (e) {
						console.log({ e });
					}
				}}
				minimal
			/>
		</div>
	);
};

export default DeleteDateButton;
