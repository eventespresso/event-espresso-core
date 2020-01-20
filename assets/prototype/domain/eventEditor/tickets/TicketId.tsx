import React from 'react';

import useTicketItem from '../data/queries/tickets/useTicketItem';
import { ListItemProps } from '../types';

const TicketId: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const { dbId } = useTicketItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default TicketId;
