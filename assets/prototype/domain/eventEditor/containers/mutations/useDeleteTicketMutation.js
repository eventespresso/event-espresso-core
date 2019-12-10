import path from 'ramda/src/path';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TICKET } from './tickets';
import { GET_TICKETS } from '../queries/tickets';
import useDatetimeIds from '../queries/useDatetimeIds';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useDeleteTicketMutation = ({ id }) => {
	const datetimeIn = useDatetimeIds();
	const { removeRelation, dropRelations } = useRelations();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `deleting ticket ${id}`,
		successMessage: `ticket ${id} successfully deleted`,
	});

	const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET, { onCompleted, onError });

	initializationNotices(loading, error);

	const variables = { input: { clientMutationId: 'xyz', id } };

	const update = (proxy, { data }) => {
		const ticket = path(['deleteTicket', 'ticket'], data);

		const options = {
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
		};

		if (ticket.id) {
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
			// Remove the ticket from all datetime relations
			removeRelation({
				entity: 'tickets',
				entityId: ticket.id,
				relation: 'datetimes',
			});
			// Remove the ticket from all price relations
			removeRelation({
				entity: 'tickets',
				entityId: ticket.id,
				relation: 'prices',
			});
			// Drop all the relations for the ticket
			dropRelations({
				entity: 'tickets',
				entityId: ticket.id,
			});
		}
	};

	return () => deleteTicket({ variables, update });
};

export default useDeleteTicketMutation;
