import React from 'react';

import {
	useEntityActions,
	useEntityActionsManager,
	AdditionalSubscriptionCbOptions,
} from '@appLayout/entityActionsMenu';
import { Domain } from './types';
import { Entity } from '@appServices/apollo/types';

const useEntityActionsMenuItems = <E extends Entity, AO = AdditionalSubscriptionCbOptions>(
	entityType: string,
	entity: E,
	// additionalOptions will be passed back to the callback
	// make sure to pass it as object with your own unique keys
	// so as to identify what you are interested in.
	additionalOptions?: AO,
	filterByEntityType = true
): Array<React.ReactNode> => {
	const entityActionsManager = useEntityActionsManager(entityType, entity.id);
	const { getSubscriptions } = useEntityActions<Domain>('eventEditor');

	const { getMenuItems } = entityActionsManager;

	const subscriptions = getSubscriptions({ entityType: filterByEntityType ? entityType : null });

	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ entityType, entity }, entityActionsManager, additionalOptions);
	});

	const menuItems = getMenuItems();

	return Object.entries<React.ReactType>(menuItems).map(([menuKey, Component], i) => <Component key={menuKey + i} />);
};

export default useEntityActionsMenuItems;
