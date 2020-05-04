import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { DateMainMenuProps } from './types';
import { isTrashed } from '@sharedServices/predicates';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';

const TrashDate: React.FC<DateMainMenuProps> = ({ datetime, onOpen, ...props }) => {
	if (!datetime) return null;

	const trashed = isTrashed(datetime);
	const title = trashed ? __('delete permanently') : __('trash datetime');

	return <Trash {...props} onClick={onOpen} title={title} />;
};

export default TrashDate;
