import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Copy: React.FC<MenuItemProps> = ({ entityType, onClick, ...props }) => {
	const title = sprintf(__('copy %s'), entityType);
	return <EspressoDropdownMenuItem {...props} icon={Icon.COPY} onClick={onClick} title={title} />;
};

export default Copy;
