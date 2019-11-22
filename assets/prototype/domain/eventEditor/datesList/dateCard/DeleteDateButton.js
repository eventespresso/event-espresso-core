import { Button } from '@blueprintjs/core/lib/esm';
import { DatePicker, TimePrecision } from '@blueprintjs/datetime/lib/esm';
import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';

const DeleteDateButton = ({ id }) => {
	const deleteDate = useDeleteDatetimeMutation({ id });
	const variables = { clientMutationId: 'xyz', id };

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
					deleteDate({ variables });
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
