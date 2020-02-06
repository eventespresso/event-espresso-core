import React from 'react';

import useTicketItem from '../../services/apollo/queries/tickets/useTicketItem';
import { ListItemProps } from '../../interfaces/types';

const TicketIdTag: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const { dbId } = useTicketItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default TicketIdTag;
