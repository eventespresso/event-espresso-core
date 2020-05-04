import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenuItem } from '@application/ui/layout/dropdownMenu';
import { Trash as TrashIcon } from '@appDisplay/icons';
import { MenuItemProps } from './types';

const Trash: React.FC<MenuItemProps> = ({ ...props }) => {
	const title = props.title || __('trash');

	return <DropdownMenuItem {...props} icon={TrashIcon} title={title} />;
};

export default Trash;
