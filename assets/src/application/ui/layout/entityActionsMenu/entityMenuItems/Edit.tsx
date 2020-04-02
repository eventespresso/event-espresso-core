import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Edit = ({ onClick, ...props }: MenuItemProps, ref: React.RefObject<React.ComponentType>) => {
	const title = props.title || __('edit');
	return (
		<EspressoDropdownMenuItem
			{...props}
			icon={Icon.EDIT}
			onClick={onClick}
			popoverProps={{ position: 'right center' }}
			title={title}
			ref={ref}
		/>
	);
};

export default React.forwardRef<React.ComponentType, MenuItemProps>(Edit);
