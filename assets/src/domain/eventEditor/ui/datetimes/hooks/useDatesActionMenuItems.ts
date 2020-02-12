import React from 'react';

import { Datetime } from '../../../services/apollo/types';
import { useEntityActionMenuItems, DateMenuKey } from '../../entityActionMenu';

const useDatesActionMenuItems = (datetime: Datetime): Array<React.ReactNode> => {
	return useEntityActionMenuItems<Datetime, DateMenuKey>('datetime', datetime);
};

export default useDatesActionMenuItems;
