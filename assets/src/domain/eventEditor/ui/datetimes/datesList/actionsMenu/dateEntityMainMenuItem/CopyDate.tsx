import React from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useRelations } from '@appServices/apollo/relations';

const CopyDate = (props) => {
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
	const title = __('copy datetime');

	const onClick = () => createEntity({ ...newDatetime, tickets });

	return <Copy {...props} onClick={onClick} title={title} />;
};

export default CopyDate;
