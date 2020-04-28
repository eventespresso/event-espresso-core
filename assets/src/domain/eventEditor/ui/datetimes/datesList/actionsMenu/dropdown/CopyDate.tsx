import React, { useCallback } from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useEventId } from '@edtrServices/apollo/queries/events';
import { useRelations } from '@appServices/apollo/relations';

import { DateMainMenuProps } from './types';

const CopyDate: React.FC<DateMainMenuProps> = ({ datetime, ...props }) => {
	const eventId = useEventId();
	const { createEntity } = useDatetimeMutator();
	const { getRelations } = useRelations();
	const newDatetime = pick(
		['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'reserved', 'sold', 'startDate'],
		datetime
	);
	const tickets = getRelations({
		entity: 'datetimes',
		entityId: datetime.id,
		relation: 'tickets',
	});
	const onClick = useCallback(() => createEntity({ ...newDatetime, eventId, tickets }), [newDatetime, tickets]);

	return <Copy {...props} onClick={onClick} title={__('copy datetime')} />;
};

export default CopyDate;
