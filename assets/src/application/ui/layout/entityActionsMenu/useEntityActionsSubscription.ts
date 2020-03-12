import { filter } from 'ramda';

import { useSubscriptionService } from '@appServices/subscription';
import { EntityActionsSubscription, EntityActionsSubscriptionHook } from './types';
import { serviceName as service } from './constants';

type EAS = EntityActionsSubscription;
type EAShook = EntityActionsSubscriptionHook;

const useEntityActionsSubscription: EAShook = (domain) => {
	const { getSubscriptions: getAllSubscriptions, ...restServices } = useSubscriptionService({ domain, service });

	const getSubscriptions: EAS['getSubscriptions'] = (args = {}) => {
		const { entityType } = args;
		const allSubscriptions = getAllSubscriptions();
		if (entityType) {
			return filter(({ options }) => entityType === options.entityType, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useEntityActionsSubscription;
