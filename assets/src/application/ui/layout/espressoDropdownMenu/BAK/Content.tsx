import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { NavigableMenu } from '@wordpress/components';

import { AnyObject } from '@appServices/utilities/types';
import { mergeProps } from '../utils';

interface Props extends AnyObject {
	children: React.ReactNode;
	label: string;
	menuProps?: AnyObject;
	onClose?: () => void;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
}

const Content: React.FC<Props> = ({ children, label, menuProps, onClose }) => {
	const mergedMenuProps = mergeProps(
		// @ts-ignore
		{
			'aria-label': label,
			className: classNames('components-dropdown-menu__menu'),
		},
		menuProps
	);

	return (
		<NavigableMenu {...mergedMenuProps} role='menu'>
			{Children.map(children, (child: any) => {
				const className = 'components-dropdown-menu__menu-item';
				const role = 'menuitem';
				const clonedElementProps = { className, onClose, role };
				return cloneElement(child, clonedElementProps);
			})}
		</NavigableMenu>
	);
};

export default Content;
