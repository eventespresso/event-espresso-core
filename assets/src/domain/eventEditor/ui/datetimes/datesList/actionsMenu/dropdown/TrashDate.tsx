import React from 'react';
import { __ } from '@wordpress/i18n';

import { DateMainMenuProps } from './types';
import { Trash } from '@application/ui/layout/entityActionsMenu/entityMenuItems';

const TrashDate: React.FC<DateMainMenuProps> = ({ onClick, trashed, ...props }) => {
	const title = trashed ? __('delete permanently') : __('trash datetime');

	return <Trash {...props} onClick={onClick} title={title} />;
};

export default TrashDate;
