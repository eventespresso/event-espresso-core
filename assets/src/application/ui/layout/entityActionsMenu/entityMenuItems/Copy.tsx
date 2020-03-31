import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Copy: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('copy');
	return (
		<EspressoDropdownMenuItem
			{...props}
			icon={Icon.COPY}
			onClick={onClick}
			popoverProps={{ position: 'right center' }}
			title={title}
		/>
	);
};

export default Copy;
