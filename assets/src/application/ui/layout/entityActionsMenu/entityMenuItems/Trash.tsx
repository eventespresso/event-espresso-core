import React from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { Trash as TrashIcon } from '@appDisplay/icons';
import { MenuItemProps } from './types';

const Trash: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('trash');

	const dropdownMenuProps = {
		...props,
		icon: TrashIcon,
		onClick,
		title,
	};

	return <ConfirmDelete dropdownMenuProps={dropdownMenuProps} />;
};

export default Trash;
