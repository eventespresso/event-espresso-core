import React from 'react';
import classNames from 'classnames';

import { EspressoIcon } from '@application/ui/display';
import { MenuItem } from '@infraUI/layout/menu';
import { DropdownMenuItemProps } from './types';

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ icon, title, className, ...rest }) => {
	const newClassName = classNames('components-dropdown-menu__menu-item', className);
	return (
		<MenuItem {...rest} className={newClassName} role='menuitem'>
			<EspressoIcon icon={icon} />
			<span>{title}</span>
		</MenuItem>
	);
};

export default DropdownMenuItem;
