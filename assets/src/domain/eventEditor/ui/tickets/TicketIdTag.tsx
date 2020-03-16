import React from 'react';

import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import { EntityListItemProps } from '@appLayout/entityList';

const TicketIdTag: React.FC<EntityListItemProps> = ({ id }) => {
	const { dbId } = useTicketItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default TicketIdTag;
