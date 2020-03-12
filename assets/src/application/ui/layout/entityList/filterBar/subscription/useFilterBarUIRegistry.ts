import { useUIRegistry } from '@appServices/subscription';
import { FilterBarUIRegistryHook } from './types';
import { serviceName as service } from './constants';

const useFilterBarUIRegistry: FilterBarUIRegistryHook = ({ domain, listId }) => {
	const path = [listId];

	return useUIRegistry({ domain, service, path });
};

export default useFilterBarUIRegistry;
