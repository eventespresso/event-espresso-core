import { Button } from '@blueprintjs/core/lib/esm';
import useDeleteTicketMutation from '../../containers/mutations/useDeleteTicketMutation';

const DeleteTicketButton = ({ id }) => {
	const deleteTicket = useDeleteTicketMutation({ id });

	return <Button icon={'trash'} onClick={deleteTicket} minimal />;
};

export default DeleteTicketButton;
