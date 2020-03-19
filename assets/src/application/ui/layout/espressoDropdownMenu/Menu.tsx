import React from 'react';
import classNames from 'classnames';
import { Dropdown, NavigableMenu } from '@wordpress/components';

import Content from './Content';
import { EspressoDropdownMenuProps as Props } from './types';
import { mergeProps } from './utils';
import Toggle from './Toggle';

import './style.scss';

const EspressoDropdownMenu: React.FC<Props> = ({
	children,
	className,
	icon = 'menu',
	label,
	popoverProps = { position: 'top center' },
	toggleProps,
	menuProps,
}) => {
	const mergedPopoverProps = mergeProps(
		// @ts-ignore
		{
			className: 'components-dropdown-menu__popover',
		},
		popoverProps
	);

	return (
		<Dropdown
			className={classNames(' components-dropdown-menu', className)}
			popoverProps={mergedPopoverProps}
			renderToggle={({ isOpen, onToggle }) => (
				<Toggle icon={icon} isOpen={isOpen} label={label} onToggle={onToggle} toggleProps={toggleProps} />
			)}
			renderContent={({ onClose }) => (
				<Content children={children} label={label} menuProps={menuProps} onClose={onClose} />
			)}
		/>
	);
};

export default EspressoDropdownMenu;
