import { useMutation } from '@apollo/react-hooks';
import { CREATE_TICKET } from './tickets';

const useCreateTicketMutation = () => {
	const [createTicket, { loading, error }] = useMutation(CREATE_TICKET);

	return {
		createTicket,
		loading,
		error
	};
};

export default useCreateTicketMutation;
