import React, { Children, cloneElement } from 'react';
// import classNames from 'classnames';
import { Menu as AntMenu } from 'antd';
// import { NavigableMenu } from '@wordpress/components';

import { AnyObject } from '@appServices/utilities/types';
// import { mergeProps } from './utils';

interface Props extends AnyObject {
	children: React.ReactNode;
	label: string;
	menuProps?: AnyObject;
	onClose?: () => void;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
}

const Menu: React.FC<Props> = ({ children, label, menuProps, onClose }) => {
	// const mergedMenuProps = mergeProps(
	// 	// @ts-ignore
	// 	{
	// 		'aria-label': label,
	// 		// className: classNames('components-dropdown-menu__menu'),
	// 	},
	// 	menuProps
	// );

	return (
		<AntMenu aria-label={label} {...menuProps}>
			{Children.map(children, (child: any, index: number) => (
				<AntMenu.Item key={index}>{cloneElement(child, { onClose })}</AntMenu.Item>
			))}
		</AntMenu>
	);
};

export default Menu;
