import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { DateMainMenuProps } from './types';
import { isTrashed } from '@sharedServices/predicates';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';

const TrashDate: React.FC<DateMainMenuProps> = ({ datetime, ...props }) => {
	if (!datetime) return null;

	const { id, cacheId } = datetime;
	const trashed = isTrashed(datetime);

	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);
	const title = trashed ? __('delete permanently') : __('trash datetime');

	return <Trash {...props} onClick={onClick} title={title} />;
};

export default TrashDate;
