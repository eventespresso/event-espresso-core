import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TICKET } from './tickets';
import { GET_TICKETS } from '../queries/tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useDeleteTicketMutation = ({ datetimeIn, id }) => {
	const toaster = useToaster();
	const toasterMessage = `deleting ticket ${id}`;
	const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`ticket ${id} successfully deleted`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	const variables = { input: { clientMutationId: 'xyz', id } };

	const update = (proxy, { data }) => {
		const ticket = get(data, ['deleteTicket', 'ticket']);

		const options = {
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
		};

		const { tickets = {} } = proxy.readQuery(options);

		const nodes = tickets.nodes.filter(({ id }) => id !== ticket.id);

		proxy.writeQuery({
			...options,
			data: {
				tickets: {
					...tickets,
					nodes,
				},
			},
		});
	};

	return () => deleteTicket({ variables, update });
};

export default useDeleteTicketMutation;
