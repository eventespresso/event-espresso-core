import React from 'react';

import { Entity } from '@appServices/apollo/types';
import { useEntityActionsService, useEntityActionsMenu } from '@appLayout/entityActionsMenu';

const useEntityActionsMenuItems = <E extends Entity, T extends string>(
	entityType: T,
	entity: E,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsMenu = useEntityActionsMenu(entityType, entity.id);
	const { getSubscriptions } = useEntityActionsService('eventEditor');

	const { getMenuItems } = entityActionsMenu;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity }, entityActionsMenu);
	});

	const menuItems = getMenuItems();

	return Object.entries<React.ReactType>(menuItems).map(([menuKey, Component], i) => <Component key={menuKey + i} />);
};

export default useEntityActionsMenuItems;
