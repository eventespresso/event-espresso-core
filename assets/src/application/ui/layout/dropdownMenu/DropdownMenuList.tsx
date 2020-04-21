import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';

import { MenuList, MenuListProps } from '@infraUI/layout/menu';
import './style.scss';

const DropdownMenuList: React.FC<MenuListProps> = ({ children, placement = 'top', ...props }) => {
	const className = classNames('ee-components-dropdown-menu__list', props.className);

	return (
		<MenuList {...props} className={className} placement={placement}>
			{Children.map(children, (child: any) => {
				return cloneElement(child);
			})}
		</MenuList>
	);
};

export default DropdownMenuList;
