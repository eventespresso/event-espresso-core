import React from 'react';

import DropdownMenuList from './DropdownMenuList';
import DropdownToggle from './DropdownToggle';
import { Menu } from '@infraUI/layout/menu';
import { DropdownMenuProps } from './types';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className, menuListProps, toggleProps }) => {
	return (
		<Menu>
			{({ isOpen, onClose }) => (
				<>
					<DropdownToggle isOpen={isOpen} onClose={onClose} {...toggleProps} />
					<DropdownMenuList className={className} {...menuListProps}>
						{children}
					</DropdownMenuList>
				</>
			)}
		</Menu>
	);
};

export default DropdownMenu;
