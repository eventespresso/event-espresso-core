import React from 'react';

import { Datetime } from '@edtrServices/apollo/types';
import { useEntityActionsMenuItems } from '@edtrHooks/index';

const useDatesActionMenuItems = (datetime: Datetime): Array<React.ReactNode> => {
	return useEntityActionsMenuItems('datetime', datetime);
};

export default useDatesActionMenuItems;
