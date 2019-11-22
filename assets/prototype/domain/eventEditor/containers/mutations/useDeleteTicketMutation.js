import { useMutation } from '@apollo/react-hooks';
import { DELETE_TICKET } from './tickets';

const useDeleteTicketMutation = () => {
	const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET);
	return { deleteTicket, loading, error };
};

export default useDeleteTicketMutation;
