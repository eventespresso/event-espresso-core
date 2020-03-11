import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { EntityActionsService, EntityActionsServiceHook } from './types';
import { serviceName as service } from './constants';

type EAS = EntityActionsService;
type EASH = EntityActionsServiceHook;

const useEntityActionsService: EASH = (domain) => {
	const { getSubscriptions: getServiceSubscriptions, ...restServices } = useSubscriptionService({
		domain,
		service,
	});

	const getSubscriptions: EAS['getSubscriptions'] = (options = {}) => {
		const { entityType } = options;
		const allSubscriptions = getServiceSubscriptions();
		if (entityType) {
			return filter(({ options }) => entityType === options.entityType, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useEntityActionsService;
