import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { EntityActionsService, EntityActionsServiceHook } from './types';
import { serviceName as service } from './constants';

type EAS = EntityActionsService;
type EAShook = EntityActionsServiceHook;

const useEntityActionsService: EAShook = (domain) => {
	const { getSubscriptions: getServiceSubscriptions, ...restServices } = useSubscriptionService({
		domain,
		service,
	});

	const getSubscriptions: EAS['getSubscriptions'] = (options = {}) => {
		const { entityType } = options;
		const allSubscriptions = getServiceSubscriptions();
		if (entityType) {
			return filter(
				({ options: subscriptionOptions }) => entityType === subscriptionOptions.entityType,
				allSubscriptions
			);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useEntityActionsService;
