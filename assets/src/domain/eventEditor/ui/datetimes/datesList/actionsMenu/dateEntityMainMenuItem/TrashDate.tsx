import React from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/mainMenu';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const TrashDate = () => {
	const { id } = useDatetimeContext();
	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = () => deleteEntity(id);

	return <Trash entityType='datetime' onClick={onClick} />;
};

export default TrashDate;
