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

	const registerCallback = ({ callback, listId, type }) => {
		invariant(listId, 'No `listId` provided');
		return subscribe(callback, { listId, type });
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

	const registerFilter: FBSRegistry['registerFilter'] = (callback, listId = entityListId) => {
		return registerCallback({ callback, listId, type: 'filter' });
	};

	const registerSorter: FBSRegistry['registerSorter'] = (callback, listId = entityListId) => {
		return registerCallback({ callback, listId, type: 'sort' });
	};

	const registerSearch: FBSRegistry['registerSearch'] = (callback, listId = entityListId) => {
		return registerCallback({ callback, listId, type: 'search' });
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
