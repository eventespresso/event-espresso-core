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
		const { entityType } = options;
		const allSubscriptions = getServiceSubscriptions();
		if (entityType) {
			return filter(({ options }) => entityType === options.entityType, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useFilterBarService;
