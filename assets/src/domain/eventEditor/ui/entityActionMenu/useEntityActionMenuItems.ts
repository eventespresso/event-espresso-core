import { useEntityActions, useEntityActionsManager } from '@appLayout/entityActionMenu';
import { EntityType, DateMenuKey, TicketMenuKey, Domain } from './types';
import { Entity } from '../../services/apollo/types';

const useEntityActionMenuItems = (entityType: EntityType, entity: Entity) => {
	const entityActionsManager = useEntityActionsManager<EntityType, DateMenuKey | TicketMenuKey>(
		entityType,
		entity.id
	);
	const { getSubscriptions } = useEntityActions<Domain, DateMenuKey | TicketMenuKey>('eventEditor');
	const { getMenuItems } = entityActionsManager;

	const subscriptions = getSubscriptions();

	Object.values(subscriptions).forEach((callback) => {
		callback({ entityType, entity }, entityActionsManager);
	});

	const menuItems = getMenuItems();

	return Object.values(menuItems);
};

export default useEntityActionMenuItems;
