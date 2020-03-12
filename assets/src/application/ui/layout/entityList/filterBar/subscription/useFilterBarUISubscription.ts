import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { FilterBarUISubscription, FilterBarUISubscriptionHook } from './types';
import { serviceName as service } from './constants';

type FBS = FilterBarUISubscription;
type FBShook = FilterBarUISubscriptionHook;

const useFilterBarUISubscription: FBShook = (domain) => {
	const { getSubscriptions: getUISubscriptions, ...restServices } = useSubscriptionService({ domain, service });

	const getSubscriptions: FBS['getSubscriptions'] = (args = {}) => {
		const { listId } = args;
		const allSubscriptions = getUISubscriptions();
		if (listId) {
			return filter(({ options }) => listId === options.listId, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useFilterBarUISubscription;
