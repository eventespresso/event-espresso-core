import { Button } from '@blueprintjs/core/lib/esm';
import useDeleteTicketMutation from '../../containers/mutations/useDeleteTicketMutation';

const DeleteTicketButton = ({ datetimeIn, id }) => {
	const deleteTicket = useDeleteTicketMutation({ datetimeIn, id });
	return <Button icon={'trash'} onClick={deleteTicket} minimal />;
};

export default DeleteTicketButton;
