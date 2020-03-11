import React from 'react';

import { ActionsMenuComponentProps } from '@appLayout/entityActionsMenu';
import useTicketsActionMenuItems from '../../hooks/useTicketsActionMenuItems';
import { Ticket } from '@edtrServices/apollo/types';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, ...menuProps }) => {
	const menuItems = useTicketsActionMenuItems(entity);

	return (
		<div className={`ee-entity-menu ee-datetime-menu`} {...menuProps}>
			{menuItems}
		</div>
	);
};

export default TicketActionsMenu;
