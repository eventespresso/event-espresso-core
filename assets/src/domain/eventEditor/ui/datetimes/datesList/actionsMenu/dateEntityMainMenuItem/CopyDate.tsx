import React from 'react';
import { pick } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const CopyDate = (props) => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });
	const { createEntity } = useDatetimeMutator();
	const newDatetime = pick(
		['capacity', 'description', 'endDate', 'isPrimary', 'name', 'order', 'reserved', 'sold', 'startDate'],
		datetime
	);
	const onClick = () => createEntity(newDatetime);
	const title = __('copy datetime');

	return <Copy {...props} onClick={onClick} title={title} />;
};

export default CopyDate;
