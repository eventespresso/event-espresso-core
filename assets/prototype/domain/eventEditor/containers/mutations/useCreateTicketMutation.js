import { useMutation } from '@apollo/react-hooks';
import { pathOr } from 'ramda';
import { CREATE_TICKET } from './tickets';
import { GET_TICKETS } from '../queries/tickets';
import { GET_PRICES } from '../queries/prices';

import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useRelations from '../../../../infrastructure/services/relations/useRelations';

const useCreateTicketMutation = ({ datetimes }) => {
	const { updateRelations, addRelation } = useRelations();
	const id = 0;
	const toasterMessage = `creating new ticket for datetime ${id}`;

	const initToaster = useInitToaster({
		toasterMessage,
		loadingMessage: toasterMessage,
		successMessage: 'ticket successfully created',
	});

	const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, initToaster);
	initToaster.initializationNotices(loading, error);

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
					dbId: 0,
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
					createTicket: {
						// extract prices data to avoid
						// it going to tickets cache
						ticket: { prices, ...ticket },
					},
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
			// if it's not the optimistic response
			if (ticket.id) {
				const defaultPrices = pathOr([], ['nodes'], prices);
				const ticketIn = tickets.nodes.map(({ id }) => id);
				// Read the data from our cache for this query.
				const data = proxy.readQuery({
					query: GET_PRICES,
					variables: {
						where: {
							ticketIn,
						},
					},
				});

				// write the data to cache without
				// mutating the cache directly
				proxy.writeQuery({
					query: GET_PRICES,
					data: {
						...data,
						prices: {
							...data.prices,
							nodes: [...data.prices.nodes, ...defaultPrices],
						},
					},
					variables: {
						where: {
							ticketIn: [...ticketIn, ticket.id],
						},
					},
				});

				// Set relations with datetimes
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
				// Set relations with prices
				const priceIds = defaultPrices.map(({ id }) => id);
				updateRelations({
					entity: 'tickets',
					entityId: ticket.id,
					relation: 'prices',
					relationIds: priceIds,
				});
				priceIds.forEach((entityId) => {
					addRelation({
						entity: 'prices',
						entityId,
						relation: 'tickets',
						relationId: ticket.id,
					});
				});
			}

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
