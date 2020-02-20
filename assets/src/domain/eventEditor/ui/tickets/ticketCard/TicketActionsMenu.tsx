import React from 'react';

import { ActionsMenuComponentProps } from '@appLayout/entityActionsMenu';
import useTicketsActionMenuItems from '../hooks/useTicketsActionMenuItems';
import { Ticket } from '../../../services/apollo/types';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, menuItemProps, ...menuProps }) => {
	const menuItems = useTicketsActionMenuItems(entity, menuItemProps);

	return (
		<div className={`ee-entity-menu ee-datetime-menu`} {...menuProps}>
			{menuItems}
		</div>
	);
};

export default TicketActionsMenu;
