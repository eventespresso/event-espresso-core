import { useApolloClient } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import useCacheRehydrationData from './useCacheRehydrationData';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { ConfigDataProps } from '../../../../application/services/config';
import useConfig from '../../../../application/services/config/useConfig';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import useEventId from './events/useEventId';
import {
	queries,
	DEFAULT_DATETIME_LIST_DATA,
	DEFAULT_TICKET_LIST_DATA,
	DEFAULT_PRICE_LIST_DATA,
	DEFAULT_PRICE_TYPE_LIST_DATA,
} from './';
import { WriteQueryOptions } from './types';
import { Datetime, DatetimesList, Ticket, TicketsList, PricesList, PriceTypesList } from '../types';
import { Viewer, GeneralSettingsData } from '../../../../application/valueObjects/config/types';

const { GET_TICKETS, GET_DATETIMES, GET_PRICE_TYPES, GET_PRICES, GET_CURRENT_USER, GET_GENERAL_SETTINGS } = queries;

const useCacheRehydration = (): void => {
	const client = useApolloClient();
	const eventId: number = useEventId();
	const { setData } = useRelations();
	const { setConfig } = useConfig();
	const {
		datetimes: espressoDatetimes = DEFAULT_DATETIME_LIST_DATA,
		tickets: espressoTickets = DEFAULT_TICKET_LIST_DATA,
		prices: espressoPrices = DEFAULT_PRICE_LIST_DATA,
		priceTypes: espressoPriceTypes = DEFAULT_PRICE_TYPE_LIST_DATA,
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
	client.writeQuery<PriceTypesList>(writeQueryOptions);

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
	client.writeQuery<DatetimesList>(writeQueryOptions);

	/* Rehydrate tickets */
	const datetimeIn = pathOr<Datetime[]>([], ['nodes'], espressoDatetimes).map(({ id }) => id);
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
	client.writeQuery<TicketsList>(writeQueryOptions);

	/* Rehydrate prices */
	const ticketIn = pathOr<Ticket[]>([], ['nodes'], espressoTickets).map(({ id }) => id);
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
	client.writeQuery<PricesList>(writeQueryOptions);

	/* Rehydrate current user */
	writeQueryOptions = {
		query: GET_CURRENT_USER,
		data: {
			viewer: currentUser,
		},
	};
	client.writeQuery<Viewer>(writeQueryOptions);
	setConfig((config: ConfigDataProps) => ({ ...config, currentUser }));

	/* Rehydrate general settings */
	writeQueryOptions = {
		query: GET_GENERAL_SETTINGS,
		data: {
			generalSettings,
		},
	};
	client.writeQuery<GeneralSettingsData>(writeQueryOptions);
	setConfig((config: ConfigDataProps) => ({ ...config, generalSettings }));

	/* Rehydrate relations */
	setData(relations);
};

export default useCacheRehydration;
