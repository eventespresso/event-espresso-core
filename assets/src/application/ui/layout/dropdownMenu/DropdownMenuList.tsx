import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';

import { MenuList, MenuListProps } from '@infraUI/layout/menu';

const DropdownMenuList: React.FC<MenuListProps> = ({ children, className, placement = 'top', ...rest }) => {
	const newClassName = classNames(' components-dropdown-menu', className);
	return (
		<MenuList placement={placement} {...rest} className={newClassName}>
			{Children.map(children, (child: any) => {
				return cloneElement(child);
			})}
		</MenuList>
	);
};

export default DropdownMenuList;
