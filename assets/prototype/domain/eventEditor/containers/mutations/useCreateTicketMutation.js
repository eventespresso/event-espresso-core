import { useMutation } from '@apollo/react-hooks';
import { CREATE_TICKET } from './tickets';
import { GET_TICKETS } from '../queries/tickets';

import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useCreateTicketMutation = ({ datetimes }) => {
	const toaster = useToaster();
	const { updateRelations, addRelation } = useRelations();
	const id = 0;
	const toasterMessage = `creating new ticket for datetime ${id}`;
	const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success('ticket successfully created');
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});
	toaster.loading(loading, toasterMessage);
	toaster.error(error);

	const onCreateHandler = ({ name, description, price, datetimes: ticketDatetimes = [] }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				name,
				description,
				price,
				datetimes: ticketDatetimes,
			},
		};
		const optimisticResponse = {
			createTicket: {
				__typename: 'CreateTicketPayload',
				ticket: {
					__typename: 'Ticket',
					ticketId: 0,
					name,
					description,
					price,
				},
			},
		};

		const update = (
			proxy,
			{
				data: {
					createTicket: { ticket },
				},
			}
		) => {
			const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];
			const options = {
				query: GET_TICKETS,
				variables: {
					where: {
						datetimeIn,
					},
				},
			};
			// Read the data from our cache for this query.
			/**
			 * @todo use try...catch
			 * */
			const { tickets = {} } = proxy.readQuery(options);

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					tickets: {
						...tickets,
						nodes: [...tickets.nodes, ticket],
					},
				},
			});
			// if it's not the optimistic response
			if (ticket.id) {
				updateRelations({
					entity: 'tickets',
					entityId: ticket.id,
					relation: 'datetimes',
					relationIds: ticketDatetimes,
				});
				ticketDatetimes.forEach((entityId) => {
					addRelation({
						entity: 'datetimes',
						entityId,
						relation: 'tickets',
						relationId: ticket.id,
					});
				});
			}
		};

		createTicket({
			variables,
			optimisticResponse,
			update,
		});
	};

	return onCreateHandler;
};

export default useCreateTicketMutation;
