import React from 'react';

import { ActionsMenuComponentProps, EntityActionsMenu } from '@appLayout/entityActionsMenu';
import useTicketsActionMenuItems from '../../hooks/useTicketsActionMenuItems';
import { Ticket } from '@edtrServices/apollo/types';
import { getPropsAreEqual } from '@appServices/utilities';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, ...props }) => {
	const menuItems = useTicketsActionMenuItems(entity);

	return <EntityActionsMenu {...props} menuItems={menuItems} />;
};

export default React.memo(TicketActionsMenu, getPropsAreEqual(['entity', 'cacheId']));
