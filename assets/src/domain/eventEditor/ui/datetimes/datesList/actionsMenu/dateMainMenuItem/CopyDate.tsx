import React, { useCallback } from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useRelations } from '@appServices/apollo/relations';

const CopyDate: React.FC = () => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });
	const { createEntity } = useDatetimeMutator();
	const { getRelations } = useRelations();
	const newDatetime = pick(
		['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'reserved', 'sold', 'startDate'],
		datetime
	);
	const tickets = getRelations({
		entity: 'datetimes',
		entityId: id,
		relation: 'tickets',
	});
	const onClick = useCallback(() => createEntity({ ...newDatetime, tickets }), [newDatetime, tickets]);

	return <Copy onClick={onClick} title={__('copy datetime')} />;
};

export default CopyDate;
