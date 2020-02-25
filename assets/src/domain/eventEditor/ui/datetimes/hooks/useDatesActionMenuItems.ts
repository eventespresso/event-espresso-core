import React from 'react';

import { Datetime } from '@edtrServices/apollo/types';
import { useEntityActionsMenuItems, ActionsMenuItemProps } from '@appLayout/entityActionsMenu';
import { AdditionalDateMenuOptions } from '../types';

const useDatesActionMenuItems = (datetime: Datetime, menuItemProps?: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionsMenuItems<Datetime, AdditionalDateMenuOptions>('datetime', datetime, {
		dateMenuItemProps: menuItemProps,
	});
};

export default useDatesActionMenuItems;
