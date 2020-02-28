import { useCallback } from 'react';
import { TagsOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';

import useTAMState from './useTAMState';
import { AssignmentFnArgs } from './types';

type Callback = (args: AssignmentFnArgs) => React.ReactType;

const useCellIcon = (): Callback => {
	const { getAssignmentStatus } = useTAMState();

	return useCallback<Callback>(
		({ datetimeId, ticketId }) => {
			const status = getAssignmentStatus({ datetimeId, ticketId });
			switch (status) {
				case 'NEW':
				case 'OLD':
					return TagsOutlined;
				case 'REMOVED':
					return CloseOutlined;
				default:
					return MinusOutlined;
			}
		},
		[getAssignmentStatus]
	);
};

export default useCellIcon;
