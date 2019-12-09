import { Button } from '@blueprintjs/core/lib/esm';
import useEntityMutator from '../../containers/mutations/useEntityMutator';

const DeleteTicketButton = ({ id }) => {
	const { deleteEntity } = useEntityMutator('Ticket', id);

	return <Button icon={'trash'} onClick={deleteEntity} minimal />;
};

export default DeleteTicketButton;
