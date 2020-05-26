import React from 'react';

import { Menu } from '@infraUI/layout/menu';

import DropdownMenuList from './DropdownMenuList';
import DropdownToggle from './DropdownToggle';

import { DropdownMenuProps } from './types';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className, menuListProps, toggleProps }) => {
	return (
		<Menu>
			{({ isOpen, onClose }) => (
				<div className='ee-dropdown-menu'>
					<DropdownToggle isOpen={isOpen} onClose={onClose} {...toggleProps} />

					<DropdownMenuList className={className} {...menuListProps}>
						{children}
					</DropdownMenuList>
				</div>
			)}
		</Menu>
	);
};

export default React.memo(DropdownMenu);
