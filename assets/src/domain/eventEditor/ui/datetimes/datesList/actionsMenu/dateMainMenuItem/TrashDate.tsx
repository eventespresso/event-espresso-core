import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeContext } from '@edtrHooks/index';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const TrashDate: React.FC = (props) => {
	const { id } = useDatetimeContext();
	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = useCallback(() => deleteEntity({ id }), [id]);

	return <Trash {...props} onClick={onClick} title={__('trash datetime')} />;
};

export default TrashDate;
