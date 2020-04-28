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

	const registerCallback = ({ callback, listId, priority, type }) => {
		invariant(listId, 'No `listId` provided');
		return subscribe(callback, { listId, priority, type });
	};

	const getCallbacks = ({ listId = entityListId, type }) => {
		invariant(listId, 'No `listId` provided');
		const allSubscriptions = getSubscriptions();

		const isForList = pathEq(['options', 'listId'], listId);
		const isOfType = pathEq(['options', 'type'], type);
		const isOfTypeAndForList = allPass([isForList, isOfType]);

		return filter(isOfTypeAndForList, allSubscriptions);
	};

	const exposeToRegistry: ExposeToRegistry = (key, value) => {
		const existingValue = getServiceRegistryItem(key);
		if (typeof existingValue !== 'function') {
			addToServiceRegistry(key, value);
		}
	};

	const getFilters = (listId = entityListId) => {
		return getCallbacks({ listId, type: 'filter' });
	};

	const getSorters = (listId = entityListId) => {
		return getCallbacks({ listId, type: 'sort' });
	};

	const getSearches = (listId = entityListId) => {
		return getCallbacks({ listId, type: 'search' });
	};

	const registerFilter: FBSRegistry['registerFilter'] = (callback, priority = 10, listId = entityListId) => {
		return registerCallback({ callback, listId, priority, type: 'filter' });
	};

	const registerSorter: FBSRegistry['registerSorter'] = (callback, priority = 10, listId = entityListId) => {
		return registerCallback({ callback, listId, priority, type: 'sort' });
	};

	const registerSearch: FBSRegistry['registerSearch'] = (callback, priority = 10, listId = entityListId) => {
		return registerCallback({ callback, listId, priority, type: 'search' });
	};

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
