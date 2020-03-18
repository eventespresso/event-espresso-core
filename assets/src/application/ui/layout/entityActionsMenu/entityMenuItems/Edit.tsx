import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Edit: React.FC<MenuItemProps> = ({ entityType, onClick, ...props }) => {
	const title = sprintf(__('edit %s'), entityType);
	return <EspressoDropdownMenuItem {...props} icon={Icon.EDIT} onClick={onClick} title={title} />;
};

export default Edit;
