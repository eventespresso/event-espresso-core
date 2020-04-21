import React from 'react';
import classNames from 'classnames';

import { MenuItem } from '@infraUI/layout/menu';
import { DropdownMenuItemProps } from './types';

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ icon: Icon, title, ...props }) => {
	const className = classNames('components-dropdown-menu__menu-item', props.className);

	return (
		<MenuItem {...props} className={className} role='menuitem'>
			{Icon && <Icon />}
			<span>{title}</span>
		</MenuItem>
	);
};

export default DropdownMenuItem;
