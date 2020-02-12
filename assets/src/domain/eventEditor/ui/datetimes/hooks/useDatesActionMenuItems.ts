import React from 'react';

import { Datetime } from '../../../services/apollo/types';
import { useEntityActionMenuItems, DateMenuKey, ActionsMenuItemProps } from '../../entityActionMenu';

const useDatesActionMenuItems = (datetime: Datetime, menuItemProps: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionMenuItems<Datetime, DateMenuKey>('datetime', datetime, menuItemProps);
};

export default useDatesActionMenuItems;
