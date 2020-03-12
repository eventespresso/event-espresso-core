import { useSubscriptionUIRegistry } from '@appServices/subscription';
import { FilterBarHook } from './types';
import { serviceName as service } from './constants';

const useFilterBar: FilterBarHook = ({ domain, listId }) => {
	const path = [listId];

	return useSubscriptionUIRegistry({ domain, service, path });
};

export default useFilterBar;
