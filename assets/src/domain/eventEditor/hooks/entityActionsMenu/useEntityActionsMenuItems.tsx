import React from 'react';

import { Entity } from '@appServices/apollo/types';
import { useEntityActionsService, useEntityActionsMenu } from '@appLayout/entityActionsMenu';
import { domain } from '@edtrServices/constants';

const useEntityActionsMenuItems = <E extends Entity, T extends string>(
	entityType: T,
	entity: E,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsMenu = useEntityActionsMenu({ domain, entityType, entityId: entity.id });
	const { getSubscriptions } = useEntityActionsService(domain);

	const { getElements } = entityActionsMenu;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity }, entityActionsMenu);
	});

	const menuItems = getElements();

	return Object.entries(menuItems).map(([itemKey, Component], i) => <Component key={itemKey + i} />);
};

export default useEntityActionsMenuItems;
