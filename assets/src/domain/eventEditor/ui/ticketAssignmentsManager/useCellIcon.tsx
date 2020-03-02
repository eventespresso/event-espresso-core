import React, { useCallback, CSSProperties } from 'react';
import { TagsOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';

import useTAMState from './useTAMState';
import { AssignmentFnArgs } from './types';

type Callback = (args: AssignmentFnArgs) => React.ReactNode;

const iconStyle: CSSProperties = {
	color: '#fff',
};

const useCellIcon = (): Callback => {
	const { getAssignmentStatus } = useTAMState();

	return useCallback<Callback>(
		({ datetimeId, ticketId }) => {
			const status = getAssignmentStatus({ datetimeId, ticketId });
			switch (status) {
				case 'NEW':
				case 'OLD':
					return <TagsOutlined style={iconStyle} />;
				case 'REMOVED':
					return <CloseOutlined style={iconStyle} />;
				default:
					return <MinusOutlined />;
			}
		},
		[getAssignmentStatus]
	);
};

export default useCellIcon;
