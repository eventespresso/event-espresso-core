import { pathOr } from 'ramda';

import useCacheRehydrationData from './useCacheRehydrationData';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { ConfigDataProps } from '../../../../application/services/config';
import useConfig from '../../../../application/services/config/useConfig';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import {
	queries,
	DEFAULT_DATETIME_LIST_DATA,
	DEFAULT_TICKET_LIST_DATA,
	DEFAULT_PRICE_LIST_DATA,
	DEFAULT_PRICE_TYPE_LIST_DATA,
} from '../queries';
import usePriceTypeQueryOptions from '../queries/priceTypes/usePriceTypeQueryOptions';
import useDatetimeQueryOptions from '../queries/datetimes/useDatetimeQueryOptions';
import useTicketQueryOptions from '../queries/tickets/useTicketQueryOptions';
import usePriceQueryOptions from '../queries/prices/usePriceQueryOptions';
import { Datetime, Ticket } from '../types';
import { useUpdateDatetimeList, useUpdatePriceTypeList, useUpdateTicketList, useUpdatePriceList } from '../entities';
import { useUpdateCurrentUserCache, useUpdateGeneralSettingsCache } from '../../../shared/data/queries';

const { GET_CURRENT_USER, GET_GENERAL_SETTINGS } = queries;

const useCacheRehydration = (): void => {
	const { setData: setRelationalData } = useRelations();
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

	const datetimeIn = pathOr<Datetime[]>([], ['nodes'], espressoDatetimes).map(({ id }) => id);
	const ticketIn = pathOr<Ticket[]>([], ['nodes'], espressoTickets).map(({ id }) => id);

	const priceTypeQueryOptions = usePriceTypeQueryOptions();
	const updatePriceTypeList = useUpdatePriceTypeList();

	const datetimeQueryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();

	const ticketQueryOptions = useTicketQueryOptions(datetimeIn);
	const updateTicketList = useUpdateTicketList();

	const priceQueryOptions = usePriceQueryOptions(ticketIn);
	const updatePriceList = useUpdatePriceList();

	const updateCurrentUser = useUpdateCurrentUserCache();
	const updateGeneralSettings = useUpdateGeneralSettingsCache();

	if (isLoaded(TypeName.priceTypes)) {
		return;
	}

	/* Rehydrate price types */
	updatePriceTypeList({
		...priceTypeQueryOptions,
		data: {
			espressoPriceTypes,
		},
	});

	/* Rehydrate datetimes */
	updateDatetimeList({
		...datetimeQueryOptions,
		data: {
			espressoDatetimes,
		},
	});

	/* Rehydrate tickets */
	updateTicketList({
		...ticketQueryOptions,
		data: {
			espressoTickets,
		},
	});

	/* Rehydrate prices */
	updatePriceList({
		...priceQueryOptions,
		data: {
			espressoPrices,
		},
	});

	/* Rehydrate current user */
	updateCurrentUser({
		query: GET_CURRENT_USER,
		data: {
			viewer: currentUser,
		},
	});
	setConfig((config: ConfigDataProps) => ({ ...config, currentUser }));

	/* Rehydrate general settings */
	updateGeneralSettings({
		query: GET_GENERAL_SETTINGS,
		data: {
			generalSettings,
		},
	});
	setConfig((config: ConfigDataProps) => ({ ...config, generalSettings }));

	/* Rehydrate relations */
	setRelationalData(relations);
};

export default useCacheRehydration;
