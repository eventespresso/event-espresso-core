import { useEffect } from '@wordpress/element';
import { useApolloClient } from '@apollo/react-hooks';
import useCacheRehydrationData from './useCacheRehydrationData';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import useStatus from '../../../../application/services/apollo/status/useStatus';
import useEventId from './events/useEventId';
import { queries } from './';

const { GET_TICKETS, GET_DATETIMES, GET_PRICE_TYPES, GET_PRICES } = queries;

const useCacheRehydration = () => {
	const client = useApolloClient();
	const eventId = useEventId();
	const { setData } = useRelations();
	const { datetimes, tickets, prices, priceTypes, relations } = useCacheRehydrationData();
	const { setIsLoaded } = useStatus();

	useEffect(() => {
		let { nodes = [] } = priceTypes;
		if (nodes.length) {
			client.writeQuery({
				query: GET_PRICE_TYPES,
				data: {
					priceTypes,
				},
			});
		}
		setIsLoaded('priceTypes', true);

		({ nodes = [] } = datetimes);
		if (nodes.length) {
			client.writeQuery({
				query: GET_DATETIMES,
				variables: {
					where: {
						eventId,
					},
				},
				data: {
					datetimes,
				},
			});
		}
		setIsLoaded('datetimes', true);

		const datetimeIn = nodes.map(({ id }) => id);
		({ nodes = [] } = tickets);
		if (datetimeIn.length && nodes.length) {
			client.writeQuery({
				query: GET_TICKETS,
				variables: {
					where: {
						datetimeIn,
					},
				},
				data: {
					tickets,
				},
			});
		}
		setIsLoaded('tickets', true);

		const ticketIn = nodes.map(({ id }) => id);
		({ nodes = [] } = prices);
		if (ticketIn.length && nodes.length) {
			client.writeQuery({
				query: GET_PRICES,
				variables: {
					where: {
						ticketIn,
					},
				},
				data: {
					prices,
				},
			});
		}
		setIsLoaded('prices', true);

		setData(relations);
	}, []);
};

export default useCacheRehydration;
