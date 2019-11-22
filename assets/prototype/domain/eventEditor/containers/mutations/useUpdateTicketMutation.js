import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TICKET } from './tickets';

const useUpdateTicketMutation = () => {
	const [updateTicket, { loading, error }] = useMutation(UPDATE_TICKET);
	return { updateTicket, loading, error };
};

export default useUpdateTicketMutation;
