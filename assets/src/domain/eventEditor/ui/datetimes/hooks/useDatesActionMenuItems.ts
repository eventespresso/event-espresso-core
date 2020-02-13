import React from 'react';

import { Datetime } from '../../../services/apollo/types';
import { useEntityActionMenuItems, DateMenuKey, ActionsMenuItemProps } from '../../entityActionMenu';
import { AdditionalDateMenuOptions } from '../types';

const useDatesActionMenuItems = (datetime: Datetime, menuItemProps?: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionMenuItems<Datetime, DateMenuKey, AdditionalDateMenuOptions>('datetime', datetime, {
		dateMenuItemProps: menuItemProps,
	});
};

export default useDatesActionMenuItems;
