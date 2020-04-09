import React from 'react';

import DropdownMenuList from './DropdownMenuList';
import DropdownToggle from './DropdownToggle';
import { Menu } from '@infraUI/layout/menu';
import { DropdownMenuProps as Props } from './types';

const DropdownMenu: React.FC<Props> = ({ children, className, menuListProps, toggleProps }) => {
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
