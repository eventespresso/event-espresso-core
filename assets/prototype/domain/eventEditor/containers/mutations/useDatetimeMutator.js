import useRelations from '../../../../infrastructure/services/relations/useRelations';
import { queries } from '../queries';
import useEventId from '../queries/useEventId';

const { GET_DATETIMES, GET_TICKETS } = queries;
/**
 */
const useDatetimeMutator = () => {
	const { updateRelations, addRelation, removeRelation, dropRelations } = useRelations();
	const eventId = useEventId();

	const options = {
		query: GET_DATETIMES,
		variables: {
			where: {
				eventId,
			},
		},
	};

	const mutator = (mutationType, input) => {
		/**
		 * @todo update optimisticResponse
		 */
		let variables, optimisticResponse, update;

		variables = {
			input: {
				clientMutationId: `${mutationType}_DATETIME`,
				...input,
			},
		};

		update = update = (
			proxy,
			{
				data: {
					[`${mutationType.toLowerCase()}Datetime`]: { datetime },
				},
			}
		) => onUpdate({ proxy, datetime, mutationType, input });

		return { variables, optimisticResponse, update };
	};

	const onUpdate = ({ proxy, datetime, mutationType, input }) => {
		// Read the existing data from cache.
		const { datetimes = {} } = proxy.readQuery(options);
		const { tickets = [] } = input;

		// if it's not the optimistic response
		if (datetime.id) {
			const { id: datetimeId } = datetime;
			const datetimeIn = datetimes.nodes.map(({ id }) => id);

			// we only need to update cache
			// when creating or deleting
			if (mutationType !== 'UPDATE') {
				_updateTicketCache({ proxy, mutationType, datetimeIn, datetimeId });
			}

			_updateRelations({ mutationType, datetimeId, tickets });
		}
		// we only need to update cache
		// when creating or deleting
		if (mutationType !== 'UPDATE') {
			_updateDatetimeCache({ proxy, mutationType, datetimes, datetime });
		}
	};

	const _updateTicketCache = ({ proxy, mutationType, datetimeIn, datetimeId }) => {
		// Read the data from our cache for this query.
		const data = proxy.readQuery({
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
		});

		const newDatetimeIn =
			mutationType === 'DELETE' ? datetimeIn.filter((id) => id !== datetimeId) : [...datetimeIn, datetimeId];

		// write the data to cache without
		// mutating the cache directly
		proxy.writeQuery({
			query: GET_TICKETS,
			data,
			variables: {
				where: {
					datetimeIn: newDatetimeIn,
				},
			},
		});
	};

	const _updateDatetimeCache = ({ proxy, mutationType, datetimes, datetime }) => {
		const nodes = datetimes.nodes;
		// delete then remove from otherwise add to the list
		const newNodes =
			mutationType === 'DELETE' ? nodes.filter(({ id }) => id !== datetime.id) : [...nodes, datetime];
		// write the data to cache without
		// mutating the cache directly
		proxy.writeQuery({
			...options,
			data: {
				datetimes: {
					...datetimes,
					nodes: newNodes,
				},
			},
		});
	};

	const _updateRelations = ({ mutationType, datetimeId, tickets }) => {
		switch (mutationType) {
			case 'CREATE':
			case 'UPDATE':
				// only if we have tickets
				if (tickets.length) {
					updateRelations({
						entity: 'datetimes',
						entityId: datetimeId,
						relation: 'tickets',
						relationIds: tickets,
					});
					// make sure to remove datetime from
					// all existing relations
					if (mutationType === 'UPDATE') {
						removeRelation({
							entity: 'datetimes',
							entityId: datetimeId,
							relation: 'tickets',
						});
					}
					tickets.forEach((entityId) => {
						addRelation({
							entity: 'tickets',
							entityId,
							relation: 'datetimes',
							relationId: datetimeId,
						});
					});
				}
				break;
			case 'DELETE':
				// Remove the datetime from all ticket relations
				removeRelation({
					entity: 'datetimes',
					entityId: datetimeId,
					relation: 'tickets',
				});
				// Drop all the relations for the datetime
				dropRelations({
					entity: 'datetimes',
					entityId: datetimeId,
				});
				break;
		}
	};

	return mutator;
};

export default useDatetimeMutator;
