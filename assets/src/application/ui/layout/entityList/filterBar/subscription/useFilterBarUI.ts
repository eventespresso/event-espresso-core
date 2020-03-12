import { useSubscriptionUIRegistry } from '@appServices/subscription';
import { FilterBarUIHook } from './types';
import { serviceName as service } from './constants';

const useFilterBarUI: FilterBarUIHook = ({ domain, listId }) => {
	const path = [listId];

	return useSubscriptionUIRegistry({ domain, service, path });
};

export default useFilterBarUI;
