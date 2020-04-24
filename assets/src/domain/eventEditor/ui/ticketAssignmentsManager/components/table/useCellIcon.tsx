import React, { useCallback } from 'react';

import { AssignmentFnArgs } from '../../types';
import { CloseOutlined, MinusOutlined } from '@appDisplay/icons/svgs';
import { Ticket } from '@appDisplay/icons';
import { useDataState } from '../../data';

type Callback = (args: AssignmentFnArgs) => React.ComponentType;

const useCellIcon = (): Callback => {
	const { getAssignmentStatus } = useDataState();

	return useCallback<Callback>(
		({ datetimeId, ticketId }) => {
			const status = getAssignmentStatus({ datetimeId, ticketId });
			switch (status) {
				case 'NEW':
				case 'OLD':
					return () => <Ticket fill='white' />;
				case 'REMOVED':
					return () => <CloseOutlined fill='white' />;
				default:
					return () => <MinusOutlined fill='white' />;
			}
		},
		[getAssignmentStatus]
	);
};

export default useCellIcon;
