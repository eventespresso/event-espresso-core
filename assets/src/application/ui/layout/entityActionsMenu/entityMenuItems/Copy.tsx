import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenuItem } from '@application/ui/layout/dropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Copy: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('copy');
	return <DropdownMenuItem {...props} icon={Icon.COPY} onClick={onClick} title={title} />;
};

export default Copy;
