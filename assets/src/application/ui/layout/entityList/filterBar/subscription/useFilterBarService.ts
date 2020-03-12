import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { FilterBarService, FilterBarServiceHook } from './types';
import { serviceName as service } from './constants';

type FBS = FilterBarService;
type FBShook = FilterBarServiceHook;

const useFilterBarService: FBShook = (domain) => {
	const { getSubscriptions: getServiceSubscriptions, ...restServices } = useSubscriptionService({
		domain,
		service,
	});

	const getSubscriptions: FBS['getSubscriptions'] = (args = {}) => {
		const { listId } = args;
		const allSubscriptions = getServiceSubscriptions();
		if (listId) {
			return filter(({ options }) => listId === options.listId, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useFilterBarService;
