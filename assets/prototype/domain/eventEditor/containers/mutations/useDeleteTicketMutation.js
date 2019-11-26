import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TICKET } from './tickets';
import { GET_TICKETS } from '../queries/tickets';

const useDeleteTicketMutation = ({ datetimeIn, id }) => {
	const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET);
	const variables = { input: { clientMutationId: 'xyz', id } };

	const update = (proxy, { data }) => {
		const ticket = get(data, ['deleteTicket', 'ticket']);

		const options = {
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn
				}
			}
		};

		const { tickets = {} } = proxy.readQuery(options);

		const nodes = tickets.nodes.filter(({ id }) => id !== ticket.id);

		proxy.writeQuery({
			...options,
			data: {
				tickets: {
					...tickets,
					nodes
				}
			}
		});
	};

	const deleteHandler = () => deleteTicket({ variables, update });

	console.log('useDeleteTicketMutation - loading: ', loading);
	console.log('useDeleteTicketMutation - error: ', error);

	return deleteHandler;
};

export default useDeleteTicketMutation;
