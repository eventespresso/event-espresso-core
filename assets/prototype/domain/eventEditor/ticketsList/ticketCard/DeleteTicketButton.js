import useDeleteTicketMutation from '../../containers/mutations/useDeleteTicketMutation';
import { Button } from '@blueprintjs/core/lib/esm';

const DeleteTicketButton = ({ ticketId }) => {
	const { deleteTicket } = useDeleteTicketMutation();
	const variables = { input: { clientMutationId: 'xyz', id: ticketId } };

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
						deleteTicket({ variables });
					} catch (e) {
						console.log({ e });
					}
				}}
				minimal
			/>
		</div>
	);
};

export default DeleteTicketButton;
