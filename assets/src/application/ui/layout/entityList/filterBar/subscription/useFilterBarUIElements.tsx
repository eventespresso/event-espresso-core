import React from 'react';

import { useFilterBarUISubscription, useFilterBarUIRegistry } from './';
import { FilterBarUIElementsHook } from './types';

const useFilterBarUIElements: FilterBarUIElementsHook = ({ domain, listId, filterState }) => {
	const registry = useFilterBarUIRegistry({ domain, listId });
	const { getSubscriptions } = useFilterBarUISubscription(domain);

	const { getElements } = registry;

	// get all subscriptions for the service
	const subscriptions = getSubscriptions({ listId });

	// invoke all the subscription callbacks
	// to let them register their UI elements
	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ listId, registry });
	});

	// Get the list of all UI elements
	// registered by the above callbacks
	const filterBarItems = getElements();

	return Object.entries(filterBarItems).map(([itemKey, Component], i) => {
		return <Component key={itemKey + i} filterState={filterState} />;
	});
};

export default useFilterBarUIElements;
