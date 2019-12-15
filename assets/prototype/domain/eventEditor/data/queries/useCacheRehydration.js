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
	const {
		datetimes: espressoDatetimes,
		tickets: espressoTickets,
		prices: espressoPrices,
		priceTypes: espressoPriceTypes,
		relations,
	} = useCacheRehydrationData();
	const { isLoaded } = useStatus();

	if (isLoaded('priceTypes')) {
		return;
	}

	let { nodes = [] } = espressoPriceTypes;
	if (nodes.length) {
		client.writeQuery({
			query: GET_PRICE_TYPES,
			data: {
				espressoPriceTypes,
			},
		});
	}

	({ nodes = [] } = espressoDatetimes);
	if (nodes.length) {
		client.writeQuery({
			query: GET_DATETIMES,
			variables: {
				where: {
					eventId,
				},
			},
			data: {
				espressoDatetimes,
			},
		});
	}

	const datetimeIn = nodes.map(({ id }) => id);
	({ nodes = [] } = espressoTickets);
	if (datetimeIn.length && nodes.length) {
		client.writeQuery({
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
			data: {
				espressoTickets,
			},
		});
	}

	const ticketIn = nodes.map(({ id }) => id);
	({ nodes = [] } = espressoPrices);
	if (ticketIn.length && nodes.length) {
		client.writeQuery({
			query: GET_PRICES,
			variables: {
				where: {
					ticketIn,
				},
			},
			data: {
				espressoPrices,
			},
		});
	}

	setData(relations);
};

export default useCacheRehydration;
