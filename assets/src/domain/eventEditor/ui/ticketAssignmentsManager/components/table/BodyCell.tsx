import React from 'react';

import { Button } from '@infraUI/inputs';
import { RenderCellProps } from '../../types';
import { useDataState } from '../../data';
import useCellIcon from './useCellIcon';

const BodyCell: React.FC<RenderCellProps> = ({ datetime, ticket }) => {
	const { toggleAssignment } = useDataState();

	const getCellIcon = useCellIcon();

	const onClick = () => toggleAssignment({ datetimeId: datetime.id, ticketId: ticket.id });

	const icon = getCellIcon({ datetimeId: datetime.id, ticketId: ticket.id });

	return <Button variant='link' onClick={onClick} icon={icon} />;
};

export default BodyCell;
