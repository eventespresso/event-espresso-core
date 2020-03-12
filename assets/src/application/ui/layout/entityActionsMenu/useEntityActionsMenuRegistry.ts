import { useUIRegistry } from '@appServices/subscription';
import { EntityActionsMenuRegistryHook } from './types';
import { serviceName as service } from './constants';

const useEntityActionsMenuRegistry: EntityActionsMenuRegistryHook = ({ domain, entityType, entityId }) => {
	const path = [entityType, entityId];

	return useUIRegistry({ domain, service, path });
};

export default useEntityActionsMenuRegistry;
