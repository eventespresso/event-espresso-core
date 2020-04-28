import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';
import { useDatetimeMutator } from '@edtrServices/apollo/mutations';
import { useDatetimeItem } from '@edtrServices/apollo';

import { DateMainMenuProps } from './types';
import { isTrashed } from '@sharedServices/predicates';

const TrashDate: React.FC<DateMainMenuProps> = ({ id, ...props }) => {
	const datetime = useDatetimeItem({ id });
	if (!datetime) return null;

	const { cacheId } = datetime;
	const trashed = isTrashed(datetime);

	const { deleteEntity } = useDatetimeMutator(id);
	const onClick = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);

	const title = trashed ? __('delete permanently') : __('trash datetime');

	return <Trash {...props} onClick={onClick} title={title} />;
};

export default TrashDate;
