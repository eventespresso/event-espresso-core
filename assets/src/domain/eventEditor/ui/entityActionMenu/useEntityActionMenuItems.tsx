import React from 'react';

import {
	useEntityActions,
	useEntityActionsManager,
	AdditionalSubscriptionCbOptions,
} from '@appLayout/entityActionMenu';
import { DateMenuKey, TicketMenuKey, Domain, EntityType } from './types';
import { Entity } from '../../services/apollo/types';

const useEntityActionMenuItems = <
	E extends Entity,
	MenuKey extends DateMenuKey | TicketMenuKey,
	AO = AdditionalSubscriptionCbOptions
>(
	entityType: EntityType,
	entity: E,
	// additionalOptions will be passed back to the callback
	// make sure to pass it as object with your own unique keys
	// so as to identify what you are interested in.
	additionalOptions?: AO,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsManager = useEntityActionsManager<EntityType, MenuKey>(entityType, entity.id);
	const { getSubscriptions } = useEntityActions<Domain, EntityType, MenuKey>('eventEditor');

	const { getMenuItems } = entityActionsManager;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity }, entityActionsManager, additionalOptions);
	});

	const menuItems = getMenuItems();

	return Object.entries<React.ReactType>(menuItems).map(([menuKey, Component], i) => <Component key={menuKey + i} />);
};

export default useEntityActionMenuItems;
