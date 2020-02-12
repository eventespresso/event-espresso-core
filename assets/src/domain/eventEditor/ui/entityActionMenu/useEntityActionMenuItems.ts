import React from 'react';

import { useEntityActions, useEntityActionsManager } from '@appLayout/entityActionMenu';
import { DateMenuKey, TicketMenuKey, Domain, EntityType, ActionsMenuItemProps } from './types';
import { Entity } from '../../services/apollo/types';

const useEntityActionMenuItems = <E extends Entity, MenuKey extends DateMenuKey | TicketMenuKey>(
	entityType: EntityType,
	entity: E,
	menuItemProps: ActionsMenuItemProps,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsManager = useEntityActionsManager<EntityType, MenuKey>(entityType, entity.id);
	const { getSubscriptions } = useEntityActions<Domain, EntityType, MenuKey>('eventEditor');

	const { getMenuItems } = entityActionsManager;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity, menuItemProps }, entityActionsManager);
	});

	const menuItems = getMenuItems();

	return Object.values(menuItems);
};

export default useEntityActionMenuItems;
