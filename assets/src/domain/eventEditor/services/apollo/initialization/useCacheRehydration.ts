import { useEffect } from 'react';
import { pathOr } from 'ramda';

import useCacheRehydrationData from './useCacheRehydrationData';
import { useRelations } from '@appServices/apollo/relations';
import { useStatus, TypeName } from '@appServices/apollo/status';
import {
	DEFAULT_DATETIME_LIST_DATA,
	DEFAULT_TICKET_LIST_DATA,
	DEFAULT_PRICE_LIST_DATA,
	DEFAULT_PRICE_TYPE_LIST_DATA,
} from '../queries';
import {
	useDatetimeQueryOptions,
	usePriceQueryOptions,
	usePriceTypeQueryOptions,
	useTicketQueryOptions,
} from '../queries';
import { Datetime, Ticket } from '../types';
import { useUpdateDatetimeList, useUpdatePriceTypeList, useUpdateTicketList, useUpdatePriceList } from '../../../hooks';
import { useCurrentUserQueryOptions, useUpdateCurrentUserCache } from '@sharedServices/apollo/queries/currentUser';
import {
	useGeneralSettingsQueryOptions,
	useUpdateGeneralSettingsCache,
} from '@sharedServices/apollo/queries/generalSettings';

const useCacheRehydration = (): void => {
	const { initialize: initializeRelations, isInitialized: relationsInitialized } = useRelations();
	const {
		event: {
			datetimes: espressoDatetimes = DEFAULT_DATETIME_LIST_DATA,
			tickets: espressoTickets = DEFAULT_TICKET_LIST_DATA,
			prices: espressoPrices = DEFAULT_PRICE_LIST_DATA,
			priceTypes: espressoPriceTypes = DEFAULT_PRICE_TYPE_LIST_DATA,
			relations,
		},
		currentUser,
		generalSettings,
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

	const currentUserQueryOptions = useCurrentUserQueryOptions();
	const updateCurrentUser = useUpdateCurrentUserCache();

	const generalSettingsQueryOptions = useGeneralSettingsQueryOptions();
	const updateGeneralSettings = useUpdateGeneralSettingsCache();

	useEffect(() => {
		if (!relationsInitialized()) {
			/* Rehydrate relations */
			initializeRelations(relations);
		}
	}, [relations]);

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
		...currentUserQueryOptions,
		data: {
			viewer: currentUser,
		},
	});

	/* Rehydrate general settings */
	updateGeneralSettings({
		...generalSettingsQueryOptions,
		data: {
			generalSettings,
		},
	});
};

export default useCacheRehydration;
