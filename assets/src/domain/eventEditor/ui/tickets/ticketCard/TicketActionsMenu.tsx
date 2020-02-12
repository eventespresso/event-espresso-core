import React, { CSSProperties } from 'react';

import { ActionsMenuComponentProps } from '../../entityActionMenu';
import useTicketsActionMenuItems from '../hooks/useTicketsActionMenuItems';
import { Ticket } from '../../../services/apollo/types';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({
	entity,
	position,
	layout = 'horizontal',
}) => {
	const menuItems = useTicketsActionMenuItems(entity);

	const style: CSSProperties = {
		position: 'absolute',
		right: '.5rem',
		textAlign: 'right',
		display: 'flex',
		flexDirection: layout === 'vertical' ? 'column' : 'row',
		zIndex: 1,
		...(position === 'top' && {
			top: '.5rem',
		}),
	};

	return (
		<div className={`ee-entity-menu ee-ticket-menu ee-entity-menu-${layout}`} style={style}>
			{menuItems}
		</div>
	);
};

export default TicketActionsMenu;
