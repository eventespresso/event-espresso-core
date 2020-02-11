import React, { CSSProperties } from 'react';

import { useEntityActionMenuItems, ActionsMenuComponentProps } from '../../entityActionMenu';
import { Ticket } from '../../../services/apollo/types';

const TicketActionsMenu: React.FC<ActionsMenuComponentProps<Ticket>> = ({ entity, position, layout }) => {
	const menuItems = useEntityActionMenuItems('ticket', entity);

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

	return <div style={style}>{menuItems}</div>;
};

export default TicketActionsMenu;
