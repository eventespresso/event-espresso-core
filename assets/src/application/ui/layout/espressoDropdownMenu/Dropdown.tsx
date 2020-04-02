import React, { useCallback, useState } from 'react';
// import classNames from 'classnames';
import { Popover } from 'antd';
// import { Dropdown } from '@wordpress/components';

import Menu from './Menu';
import { EspressoDropdownMenuProps as Props } from './types';
// import { mergeProps } from './utils';
import Toggle from './Toggle';

import './style.scss';

const Dropdown: React.FC<Props> = ({
	children,
	className,
	icon = 'menu',
	label,
	popoverProps = { position: 'top center' },
	toggleProps,
	menuProps,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const onToggle = useCallback((event: React.KeyboardEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(!isOpen);
	}, []);

	// const mergedPopoverProps = mergeProps(
	// 	// @ts-ignore
	// 	{
	// 		className: 'components-dropdown-menu__popover',
	// 	},
	// 	popoverProps
	// );

	const menu = <Menu children={children} label={label} menuProps={menuProps} />;

	return (
		<Popover content={menu} title={label} trigger='click' visible={isOpen} onVisibleChange={setIsOpen}>
			<Toggle icon={icon} isOpen={isOpen} label={label} onToggle={onToggle} toggleProps={toggleProps} />
		</Popover>
		// <Dropdown
		// 	className={classNames(' components-dropdown-menu', className)}
		// 	// @ts-ignore
		// 	popoverProps={mergedPopoverProps}
		// 	renderToggle={({ isOpen, onToggle }) => (
		// 		<Toggle icon={icon} isOpen={isOpen} label={label} onToggle={onToggle} toggleProps={toggleProps} />
		// 	)}
		// 	renderContent={({ onClose }) => (
		// 		<Content children={children} label={label} menuProps={menuProps} onClose={onClose} />
		// 	)}
		// />
	);
};

export default Dropdown;
