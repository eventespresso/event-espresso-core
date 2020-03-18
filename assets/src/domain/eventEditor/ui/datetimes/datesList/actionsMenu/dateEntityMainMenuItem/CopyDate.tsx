import React from 'react';
import { omit } from 'ramda';
import { __ } from '@wordpress/i18n';

import { Copy } from '@application/ui/layout/entityActionsMenu/mainMenu';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeItem } from '@edtrServices/apollo/queries';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const CopyDate = () => {
	const { id } = useDatetimeContext();
	const datetime = useDatetimeItem({ id });
	const { createEntity } = useDatetimeMutator();
	const newDatetime = omit(
		[
			'dbId',
			'id',
			'isActive',
			'isExpired',
			'isSoldOut',
			'isTrashed',
			'isUpcoming',
			'length',
			'status',
			'__typename',
		],
		datetime
	);
	const onClick = () => createEntity(newDatetime);

	return <Copy entityType='datetime' onClick={onClick} />;
};

export default CopyDate;
