import { useSubscriptionUIRegistry } from '@appServices/subscription';
import { FilterBarUIRegistryHook } from './types';
import { serviceName as service } from './constants';

const useFilterBarUIRegistry: FilterBarUIRegistryHook = ({ domain, listId }) => {
	const path = [listId];

	return useSubscriptionUIRegistry({ domain, service, path });
};

export default useFilterBarUIRegistry;
