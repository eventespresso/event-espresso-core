import { Button } from '@blueprintjs/core/lib/esm';
import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';

const DeleteDateButton = ({ eventId, id }) => {
	const deleteDatetime = useDeleteDatetimeMutation({ eventId, id });

	return (
		<div
			style={{
				bottom: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right',
			}}
		>
			<Button icon={'trash'} onClick={deleteDatetime} minimal />
		</div>
	);
};

export default DeleteDateButton;
