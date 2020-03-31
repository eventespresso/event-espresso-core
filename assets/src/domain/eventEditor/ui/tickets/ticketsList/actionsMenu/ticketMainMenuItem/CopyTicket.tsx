import React, { useCallback } from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useTicketContext } from '@edtrHooks/index';
import { useTicketItem } from '@edtrServices/apollo/queries';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { useRelations } from '@appServices/apollo/relations';

const CopyTicket: React.FC = (props) => {
	const { id } = useTicketContext();
	const ticket = useTicketItem({ id });
	const { createEntity } = useTicketMutator();
	const { getRelations } = useRelations();
	const newTicket = pick(
		['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'reserved', 'sold', 'startDate'],
		ticket
	);
	const datetimes = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	});

	const onClick = useCallback(() => createEntity({ ...newTicket, datetimes }), [datetimes, newTicket]);

	return <Copy {...props} onClick={onClick} title={__('copy ticket')} />;
};

export default CopyTicket;
