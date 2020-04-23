import React from 'react';

import { ActionsMenuComponentProps } from '@appLayout/entityActionsMenu';
import useTicketsActionMenuItems from '../../hooks/useTicketsActionMenuItems';
import { Ticket } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, ...menuProps }) => {
	const menuItems = useTicketsActionMenuItems(entity);

	return (
		<div className='ee-entity-menu' {...menuProps}>
			{menuItems}
		</div>
	);
};

export default React.memo(TicketActionsMenu, getPropsAreEqual(['entity', 'cacheId']));
