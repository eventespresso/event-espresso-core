import React, { useCallback, CSSProperties } from 'react';
import AntIcon, { CloseOutlined, MinusOutlined } from '@ant-design/icons';

import { useDataState } from '../../data';
import { AssignmentFnArgs } from '../../types';
import { Ticket } from '@appDisplay/espressoIcons';

type Callback = (args: AssignmentFnArgs) => React.ReactNode;

const iconStyle: CSSProperties = {
	color: '#fff',
};

const useCellIcon = (): Callback => {
	const { getAssignmentStatus } = useDataState();

	return useCallback<Callback>(
		({ datetimeId, ticketId }) => {
			const status = getAssignmentStatus({ datetimeId, ticketId });
			switch (status) {
				case 'NEW':
				case 'OLD':
					return <AntIcon style={iconStyle} component={Ticket} />;
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
