import React from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const TrashDate = (props) => {
	const { id } = useDatetimeContext();
	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = () => deleteEntity({ id });
	const title = __('trash datetime');

	return <Trash {...props} onClick={onClick} title={title} />;
};

export default TrashDate;
