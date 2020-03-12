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

	const getSubscriptions: EAS['getSubscriptions'] = (args = {}) => {
		const { entityType } = args;
		const allSubscriptions = getServiceSubscriptions();
		if (entityType) {
			return filter(({ options }) => entityType === args.entityType, allSubscriptions);
		}
		return allSubscriptions;
	};

	return { ...restServices, getSubscriptions };
};

export default useEntityActionsService;
