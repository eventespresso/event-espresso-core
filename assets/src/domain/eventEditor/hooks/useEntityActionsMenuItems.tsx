import React from 'react';

import { Entity } from '@appServices/apollo/types';
import { useEntityActions, useEntityActionsManager } from '@appLayout/entityActionsMenu';

const useEntityActionsMenuItems = <E extends Entity, T extends string>(
	entityType: T,
	entity: E,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsManager = useEntityActionsManager(entityType, entity.id);
	const { getSubscriptions } = useEntityActions('eventEditor');

	const { getMenuItems } = entityActionsManager;

	const subscriptions = getSubscriptions<E, T>({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity }, entityActionsManager);
	});

	const menuItems = getMenuItems();

	return Object.entries<React.ReactType>(menuItems).map(([menuKey, Component], i) => <Component key={menuKey + i} />);
};

export default useEntityActionsMenuItems;
