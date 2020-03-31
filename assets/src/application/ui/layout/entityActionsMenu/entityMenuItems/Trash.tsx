import React from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appLayout/confirmDelete';
import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Trash: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('trash');

	return (
		<ConfirmDelete onConfirm={onClick}>
			<EspressoDropdownMenuItem
				{...props}
				icon={Icon.TRASH}
				popoverProps={{ position: 'right center' }}
				title={title}
			/>
		</ConfirmDelete>
	);
};

export default Trash;
