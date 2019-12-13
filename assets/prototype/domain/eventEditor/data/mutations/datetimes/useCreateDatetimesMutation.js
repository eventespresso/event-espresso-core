import { useMutation } from '@apollo/react-hooks';
import { CREATE_DATETIME } from './datetimes';
import { GET_DATETIMES } from '../../queries/datetimes/datetimes';
import { GET_TICKETS } from '../../queries/tickets/tickets';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import useRelations from '../../../../../application/services/apollo/relations/useRelations';

const useCreateDatetimesMutation = ({ eventId }) => {
	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `creating new datetime for event ${eventId}`,
		successMessage: 'datetime successfully created',
	});

	const { updateRelations, addRelation } = useRelations();

	const [createDate, { loading, error }] = useMutation(CREATE_DATETIME, { onCompleted, onError });
	initializationNotices(loading, error);

	// On submit handler receives data from FormModal
	return ({ description, name, tickets = [] }) => {
		const variables = {
			input: {
				clientMutationId: 'xyz',
				description,
				eventId,
				name,
				tickets,
			},
		};

		const optimisticResponse = {
			createDatetime: {
				__typename: 'CreateDatetimePayload',
				datetime: {
					__typename: 'Datetime',
					dbId: 0,
					name,
					description,
					endDate: '',
					startDate: '',
				},
			},
		};

		const update = (
			proxy,
			{
				data: {
					createDatetime: { datetime },
				},
			}
		) => {
			const options = {
				query: GET_DATETIMES,
				variables: {
					where: {
						eventId,
					},
				},
			};
			// Read the data from our cache for this query.
			const { datetimes = {} } = proxy.readQuery(options);

			// if it's not the optimistic response
			if (datetime.id) {
				const datetimeIn = datetimes.nodes.map(({ id }) => id);
				// Read the data from our cache for this query.
				const data = proxy.readQuery({
					query: GET_TICKETS,
					variables: {
						where: {
							datetimeIn,
						},
					},
				});

				// write the data to cache without
				// mutating the cache directly
				proxy.writeQuery({
					query: GET_TICKETS,
					data,
					variables: {
						where: {
							datetimeIn: [...datetimeIn, datetime.id],
						},
					},
				});

				updateRelations({
					entity: 'datetimes',
					entityId: datetime.id,
					relation: 'tickets',
					relationIds: tickets,
				});
				tickets.forEach((entityId) => {
					addRelation({
						entity: 'tickets',
						entityId,
						relation: 'datetimes',
						relationId: datetime.id,
					});
				});
			}

			// write the data to cache without
			// mutating the cache directly
			proxy.writeQuery({
				...options,
				data: {
					datetimes: {
						...datetimes,
						nodes: [...datetimes.nodes, datetime],
					},
				},
			});
		};

		createDate({
			variables,
			optimisticResponse,
			update,
		});
	};
};

export default useCreateDatetimesMutation;
