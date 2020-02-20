import { useState } from 'react';
import { pathOr, assocPath } from 'ramda';

import { EntityActionsManager, EntityMenuItems, MenuRegistry } from './types';

let menuRegistry: MenuRegistry = {};

const useEntityActionsManager = (entityType: string, entityId: string): EntityActionsManager => {
	const [menuItems, setMenuItems] = useState([]);

	const getMapKey = (itemKey: string) => `${entityType}:${entityId}:${itemKey}`;

	const registerMenuItem = (key: string, component: React.ReactType): void => {
		const mapKey = getMapKey(key);
		if (!menuItems.includes(mapKey)) {
			setMenuItems((items) => [...items, mapKey]);
			// Add menu item(may be JSX) to the registry
			// by calling the component function
			menuRegistry = assocPath([entityType, entityId, key], component, menuRegistry);
		}
	};

	const unRegisterMenuItem = (key: string): void => {
		const mapKey = getMapKey(key);
		if (menuItems.includes(mapKey)) {
			setMenuItems(menuItems.filter((_key_) => mapKey !== _key_));
		}
		delete menuRegistry[mapKey];
	};

	const getMenuItems = () => pathOr<EntityMenuItems>({}, [entityType, entityId], menuRegistry);

	return { registerMenuItem, unRegisterMenuItem, getMenuItems };
};

export default useEntityActionsManager;
