import { Button } from '@blueprintjs/core/lib/esm';
import useDeleteTicketHandler from '../hooks/useDeleteTicketHandler';

const DeleteTicketButton = ({ id }) => {
	const handleDeleteTicket = useDeleteTicketHandler({ id });

	return <Button icon={'trash'} onClick={handleDeleteTicket} minimal />;
};

export default DeleteTicketButton;
