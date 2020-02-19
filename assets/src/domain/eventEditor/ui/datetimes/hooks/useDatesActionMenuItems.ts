import React from 'react';

import { Datetime } from '../../../services/apollo/types';
import { useEntityActionsMenuItems, EntityType, MenuKey, ActionsMenuItemProps } from '@appLayout/entityActionsMenu';
import { AdditionalDateMenuOptions } from '../types';

const useDatesActionMenuItems = (datetime: Datetime, menuItemProps?: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionsMenuItems<Datetime, EntityType, MenuKey, AdditionalDateMenuOptions>('datetime', datetime, {
		dateMenuItemProps: menuItemProps,
	});
};

export default useDatesActionMenuItems;
