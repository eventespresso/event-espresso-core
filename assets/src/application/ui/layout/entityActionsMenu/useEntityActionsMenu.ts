import { useSubscriptionUIRegistry } from '@appServices/subscription';
import { EntityActionsMenuHook } from './types';
import { serviceName as service } from './constants';

const useEntityActionsMenu: EntityActionsMenuHook = ({ domain, entityType, entityId }) => {
	const path = [entityType, entityId];

	return useSubscriptionUIRegistry({ domain, service, path });
};

export default useEntityActionsMenu;
