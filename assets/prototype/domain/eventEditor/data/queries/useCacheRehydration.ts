import { useApolloClient } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import useCacheRehydrationData from './useCacheRehydrationData';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { ConfigDataProps } from '../../../../application/services/config';
import useConfig from '../../../../application/services/config/useConfig';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import useEventId from './events/useEventId';
import { queries } from './';
import { WriteQueryOptions } from './types';

const { GET_TICKETS, GET_DATETIMES, GET_PRICE_TYPES, GET_PRICES, GET_CURRENT_USER, GET_GENERAL_SETTINGS } = queries;

type Entity = 'Datetimes' | 'Tickets' | 'Prices' | 'PriceTypes';

const DEFAULT_DATA = (entity: Entity) => {
	return {
		nodes: [],
		__typename: `EspressoRootQuery${entity}Connection`,
	};
};

const useCacheRehydration = (): void => {
	const client = useApolloClient();
	const eventId: number = useEventId();
	const { setData } = useRelations();
	const { setConfig } = useConfig();
	const {
		datetimes: espressoDatetimes = DEFAULT_DATA('Datetimes'),
		tickets: espressoTickets = DEFAULT_DATA('Tickets'),
		prices: espressoPrices = DEFAULT_DATA('Prices'),
		priceTypes: espressoPriceTypes = DEFAULT_DATA('PriceTypes'),
		currentUser,
		generalSettings,
		relations,
	} = useCacheRehydrationData();
	const { isLoaded } = useStatus();

	if (isLoaded(TypeName.priceTypes)) {
		return;
	}

	let writeQueryOptions: WriteQueryOptions;

	/* Rehydrate price types */
	writeQueryOptions = {
		query: GET_PRICE_TYPES,
		data: {
			espressoPriceTypes,
		},
	};
	client.writeQuery(writeQueryOptions);

	/* Rehydrate datetimes */
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

	/* Rehydrate tickets */
	const datetimeIn = pathOr([], ['nodes'], espressoDatetimes).map(({ id }) => id);
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

	/* Rehydrate prices */
	const ticketIn = pathOr([], ['nodes'], espressoTickets).map(({ id }) => id);
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

	/* Rehydrate current user */
	writeQueryOptions = {
		query: GET_CURRENT_USER,
		data: {
			viewer: currentUser,
		},
	};
	client.writeQuery(writeQueryOptions);
	setConfig((config: ConfigDataProps) => ({ ...config, currentUser }));

	/* Rehydrate general settings */
	writeQueryOptions = {
		query: GET_GENERAL_SETTINGS,
		data: {
			generalSettings,
		},
	};
	client.writeQuery(writeQueryOptions);
	setConfig((config: ConfigDataProps) => ({ ...config, generalSettings }));

	/* Rehydrate relations */
	setData(relations);
};

export default useCacheRehydration;
