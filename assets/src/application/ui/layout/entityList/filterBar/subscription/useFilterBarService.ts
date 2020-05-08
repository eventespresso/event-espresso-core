import { useCallback, useEffect } from 'react';
import { allPass, filter, pathEq } from 'ramda';
import invariant from 'invariant';

import { useSubscriptionService, SubscriptionService } from '@appServices/subscription';
import { FilterBarServiceHook, FilterBarServiceRegistry, FilterBarServiceType } from './types';

type FBShook = FilterBarServiceHook;
type FBSRegistry = FilterBarServiceRegistry;
type ExposeToRegistry = SubscriptionService<FBSRegistry>['addToServiceRegistry'];

const useFilterBarService: FBShook = (domain, entityListId) => {
	const { addToServiceRegistry, getServiceRegistryItem, getSubscriptions, subscribe } = useSubscriptionService<
		typeof domain,
		FilterBarServiceType,
		FBSRegistry
	>({
		domain,
		service: FilterBarServiceType.FILTER,
	});

	const registerCallback = useCallback(
		({ callback, listId, priority, type }) => {
			invariant(listId, 'No `listId` provided');
			return subscribe(callback, { listId, priority, type });
		},
		[subscribe]
	);

	const getCallbacks = useCallback(
		({ listId = entityListId, type }) => {
			invariant(listId, 'No `listId` provided');
			const allSubscriptions = getSubscriptions();

			const isForList = pathEq(['options', 'listId'], listId);
			const isOfType = pathEq(['options', 'type'], type);
			const isOfTypeAndForList = allPass([isForList, isOfType]);

			return filter(isOfTypeAndForList, allSubscriptions);
		},
		[entityListId, getSubscriptions]
	);

	const exposeToRegistry: ExposeToRegistry = useCallback(
		(key, value) => {
			const existingValue = getServiceRegistryItem(key);
			if (typeof existingValue !== 'function') {
				addToServiceRegistry(key, value);
			}
		},
		[getServiceRegistryItem, addToServiceRegistry]
	);

	const getFilters = useCallback(
		(listId = entityListId) => {
			return getCallbacks({ listId, type: 'filter' });
		},
		[entityListId, getCallbacks]
	);

	const getSorters = useCallback(
		(listId = entityListId) => {
			return getCallbacks({ listId, type: 'sort' });
		},
		[entityListId, getCallbacks]
	);

	const getSearches = useCallback(
		(listId = entityListId) => {
			return getCallbacks({ listId, type: 'search' });
		},
		[entityListId, getCallbacks]
	);

	const registerFilter = useCallback<FBSRegistry['registerFilter']>(
		(callback, priority = 10, listId = entityListId) => {
			return registerCallback({ callback, listId, priority, type: 'filter' });
		},
		[entityListId, registerCallback]
	);

	const registerSorter = useCallback<FBSRegistry['registerSorter']>(
		(callback, priority = 10, listId = entityListId) => {
			return registerCallback({ callback, listId, priority, type: 'sort' });
		},
		[entityListId, registerCallback]
	);

	const registerSearch = useCallback<FBSRegistry['registerSearch']>(
		(callback, priority = 10, listId = entityListId) => {
			return registerCallback({ callback, listId, priority, type: 'search' });
		},
		[entityListId, registerCallback]
	);

	// Expose the regsitry functions globally
	exposeToRegistry('registerFilter', registerFilter);
	exposeToRegistry('registerSorter', registerSorter);
	exposeToRegistry('registerSearch', registerSearch);

	return {
		getFilters,
		getSearches,
		getSorters,
		registerFilter,
		registerSearch,
		registerSorter,
	};
};

export default useFilterBarService;
