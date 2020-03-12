import React from 'react';

import { useFilterBarUIService, useFilterBarUI } from '.';
import { FilterBarUIItemsHook } from './types';

const useFilterBarItems: FilterBarUIItemsHook = ({ domain, listId, filterState }) => {
	const filterBar = useFilterBarUI({ domain, listId });
	const { getSubscriptions } = useFilterBarUIService(domain);

	const { getElements } = filterBar;

	// get all subscriptions for the service
	const subscriptions = getSubscriptions({ listId });

	// invoke all the subscription callbacks
	// to let them register their UI elements
	Object.values(subscriptions).forEach(({ callback }) => {
		callback({ listId }, filterBar);
	});

	// Get the list of all UI elements
	// registered by the above callbacks
	const filterBarItems = getElements();

	return Object.entries(filterBarItems).map(([itemKey, Component], i) => {
		return <Component key={itemKey + i} filterState={filterState} />;
	});
};

export default useFilterBarItems;
