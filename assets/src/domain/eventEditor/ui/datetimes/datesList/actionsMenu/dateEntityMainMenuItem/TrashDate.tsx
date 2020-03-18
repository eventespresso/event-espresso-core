import React from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const TrashDate = (props) => {
	const { id } = useDatetimeContext();
	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = () => deleteEntity({ id });

	return <Trash {...props} entityType='datetime' onClick={onClick} />;
};

export default TrashDate;
