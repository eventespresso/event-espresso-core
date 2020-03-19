import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoDropdownMenuItem } from '@application/ui/layout/espressoDropdownMenu';
import { Icon } from '@application/ui/input';
import { MenuItemProps } from './types';

const Edit: React.FC<MenuItemProps> = ({ onClick, ...props }) => {
	const title = props.title || __('edit');
	return <EspressoDropdownMenuItem {...props} icon={Icon.EDIT} onClick={onClick} title={title} />;
};

export default Edit;
