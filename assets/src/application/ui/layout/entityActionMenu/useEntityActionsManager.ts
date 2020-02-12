import { useState } from 'react';
import { pathOr, assocPath } from 'ramda';

import { EntityActionsManager, EntityMenuItems, MenuRegistry } from './types';

let menuRegistry: MenuRegistry = {};

const useEntityActionsManager = <EntityType extends string, MenuKey extends string>(
	entityType: EntityType,
	entityId: string
): EntityActionsManager<MenuKey> => {
	const [menuItems, setMenuItems] = useState([]);

	const getMapKey = (itemKey: MenuKey) => `${entityType}:${entityId}:${itemKey}`;

	const registerMenuItem = (key: MenuKey, render: () => React.ReactNode): void => {
		const mapKey = getMapKey(key);
		if (!menuItems.includes(mapKey)) {
			setMenuItems((items) => [...items, mapKey]);
			menuRegistry = assocPath([entityType, entityId, key], render(), menuRegistry);
		}
	};

	const unRegisterMenuItem = (key: MenuKey): void => {
		const mapKey = getMapKey(key);
		if (menuItems.includes(mapKey)) {
			setMenuItems(menuItems.filter((_key_) => mapKey !== _key_));
		}
		delete menuRegistry[mapKey];
	};

	const getMenuItems = () => pathOr<EntityMenuItems<MenuKey>>({}, [entityType, entityId], menuRegistry);

	return { registerMenuItem, unRegisterMenuItem, getMenuItems };
};

export default useEntityActionsManager;
