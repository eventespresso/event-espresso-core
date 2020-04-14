import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenuItem } from '@application/ui/layout/dropdownMenu';
import { Copy as CopyIcon } from '@appDisplay/icons';
import { MenuItemProps } from './types';

const Copy: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('copy');
	return <DropdownMenuItem {...props} icon={CopyIcon} onClick={onClick} title={title} />;
};

export default Copy;
