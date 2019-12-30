import { useApolloClient } from '@apollo/react-hooks';
import useCacheRehydrationData from './useCacheRehydrationData';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { ConfigDataProps } from '../../../../application/services/config';
import useConfig from '../../../../application/services/config/useConfig';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import useEventId from './events/useEventId';
import { queries } from './';
import { WriteQueryOptions } from './types';

const { GET_TICKETS, GET_DATETIMES, GET_PRICE_TYPES, GET_PRICES, GET_CURRENT_USER, GET_GENERAL_SETTINGS } = queries;

const useCacheRehydration = (): void => {
	const client = useApolloClient();
	const eventId: number = useEventId();
	const { setData } = useRelations();
	const { setConfig } = useConfig();
	const {
		datetimes: espressoDatetimes,
		tickets: espressoTickets,
		prices: espressoPrices,
		priceTypes: espressoPriceTypes,
		currentUser,
		generalSettings,
		relations,
	} = useCacheRehydrationData();
	const { isLoaded } = useStatus();

	if (isLoaded(TypeName.priceTypes)) {
		return;
	}
	let writeQueryOptions: WriteQueryOptions;

	let { nodes = [] } = espressoPriceTypes;
	if (nodes.length) {
		writeQueryOptions = {
			query: GET_PRICE_TYPES,
			data: {
				espressoPriceTypes,
			},
		};
		client.writeQuery(writeQueryOptions);
	}

	({ nodes = [] } = espressoDatetimes);
	if (nodes.length) {
		writeQueryOptions = {
			query: GET_DATETIMES,
			variables: {
				where: {
					eventId,
				},
			},
			data: {
				espressoDatetimes,
			},
		};
		client.writeQuery(writeQueryOptions);
	}

	const datetimeIn = nodes.map(({ id }) => id);
	({ nodes = [] } = espressoTickets);
	if (datetimeIn.length && nodes.length) {
		writeQueryOptions = {
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
			data: {
				espressoTickets,
			},
		};
		client.writeQuery(writeQueryOptions);
	}

	const ticketIn = nodes.map(({ id }) => id);
	({ nodes = [] } = espressoPrices);
	if (ticketIn.length && nodes.length) {
		writeQueryOptions = {
			query: GET_PRICES,
			variables: {
				where: {
					ticketIn,
				},
			},
			data: {
				espressoPrices,
			},
		};
		client.writeQuery(writeQueryOptions);
	}

	if (currentUser) {
		writeQueryOptions = {
			query: GET_CURRENT_USER,
			data: {
				viewer: currentUser,
			},
		};
		client.writeQuery(writeQueryOptions);
		setConfig((config: ConfigDataProps) => ({ ...config, currentUser }));
	}

	if (generalSettings) {
		writeQueryOptions = {
			query: GET_GENERAL_SETTINGS,
			data: {
				generalSettings,
			},
		};
		client.writeQuery(writeQueryOptions);
		setConfig((config: ConfigDataProps) => ({ ...config, generalSettings }));
	}

	setData(relations);
};

export default useCacheRehydration;
