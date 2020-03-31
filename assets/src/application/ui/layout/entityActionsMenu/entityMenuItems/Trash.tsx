import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Trash: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('trash');

	return (
		<EspressoDropdownMenuItem
			{...props}
			icon={Icon.TRASH}
			onClick={onClick}
			popoverProps={{ position: 'right center' }}
			title={title}
		/>
	);
};

export default Trash;
