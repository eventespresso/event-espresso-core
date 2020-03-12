import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { FilterBarService, FilterBarServiceHook } from './types';
import { serviceName as service } from './constants';

type FBS = FilterBarService;
type FBSH = FilterBarServiceHook;

const useFilterBarService: FBSH = (domain) => {
	const { getSubscriptions: getServiceSubscriptions, ...restServices } = useSubscriptionService({
		domain,
		service,
	});

	const getSubscriptions: FBS['getSubscriptions'] = (options = {}) => {
		const { listId } = options;
		const allSubscriptions = getServiceSubscriptions();
		if (listId) {
			return filter(
				({ options: subscriptionOptions }) => listId === subscriptionOptions.listId,
				allSubscriptions
			);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useFilterBarService;
