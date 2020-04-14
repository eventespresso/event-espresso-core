import React from 'react';
import { __ } from '@wordpress/i18n';

import { DropdownMenuItem } from '@application/ui/layout/dropdownMenu';
import { Edit as EditIcon } from '@appDisplay/icons';
import { MenuItemProps } from './types';

const Edit: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('edit');
	return <DropdownMenuItem {...props} icon={EditIcon} onClick={onClick} title={title} />;
};

export default Edit;
