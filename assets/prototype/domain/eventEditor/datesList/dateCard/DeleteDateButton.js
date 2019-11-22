import { Button } from '@blueprintjs/core/lib/esm';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime/lib/esm';
import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';

const DeleteDateButton = ({ id }) => {
	const deleteDate = useDeleteDatetimeMutation();
	const variables = { input: { clientMutationId: 'xyz', id } };

	return (
		<div
			style={{
				margin: '0 -15px -15px 0',
				textAlign: 'right'
			}}
		>
			<Button
				icon="trash"
				onClick={() => {
					try {
						deleteDate({ variables });
					} catch (e) {
						console.log({ e });
					}
					// AppToaster.show({
					// 	intent: 'danger',
					// 	message: `Date ${date.id} Deleted`
					// });
				}}
				minimal
			/>
		</div>
	);
};

export default DeleteDateButton;
