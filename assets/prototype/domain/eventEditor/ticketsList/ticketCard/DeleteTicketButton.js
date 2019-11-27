import { Button } from '@blueprintjs/core/lib/esm';
import useDeleteTicketMutation from '../../containers/mutations/useDeleteTicketMutation';

const DeleteTicketButton = ({ datetimeIn, id }) => {
	const deleteTicket = useDeleteTicketMutation({ datetimeIn, id });

	return (
		<div
			style={{
				bottom: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right',
			}}
		>
			<Button icon={'trash'} onClick={deleteTicket} minimal />
		</div>
	);
};

export default DeleteTicketButton;
