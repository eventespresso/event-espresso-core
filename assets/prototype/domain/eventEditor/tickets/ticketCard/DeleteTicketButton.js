import { Button } from '@blueprintjs/core/lib/esm';
import useOnDeleteTicket from './useOnDeleteTicket';

const DeleteTicketButton = ({ id }) => {
	const onDeleteTicket = useOnDeleteTicket({ id });

	return <Button icon={'trash'} onClick={onDeleteTicket} minimal />;
};

export default DeleteTicketButton;
