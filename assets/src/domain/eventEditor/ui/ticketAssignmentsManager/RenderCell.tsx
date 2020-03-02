import React from 'react';
import { Button } from 'antd';

import { RenderCellProps } from './types';
import useTAMState from './useTAMState';
import useCellIcon from './useCellIcon';

const RenderCell: React.FC<RenderCellProps> = ({ datetime, ticket }) => {
	const { toggleAssignment } = useTAMState();

	const getCellIcon = useCellIcon();

	const onClick = () => toggleAssignment({ datetimeId: datetime.id, ticketId: ticket.id });

	const icon = getCellIcon({ datetimeId: datetime.id, ticketId: ticket.id });

	return <Button type='link' onClick={onClick} icon={icon} />;
};

export default RenderCell;
