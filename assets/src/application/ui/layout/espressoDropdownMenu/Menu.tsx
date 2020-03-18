import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { DOWN } from '@wordpress/keycodes';
import { Dropdown, NavigableMenu } from '@wordpress/components';

import { EspressoButton } from '@application/ui/input';

import { EspressoDropdownMenuProps as Props } from './types';

import './style.scss';

const mergeProps = (defaultProps: Props, props: Props) => {
	const mergedProps = {
		...defaultProps,
		...props,
	};

	if (props?.className && defaultProps?.className) {
		mergedProps.className = classNames(props?.className, defaultProps?.className);
	}

	return mergedProps;
};

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
			renderToggle={({ isOpen, onToggle }) => {
				const openOnArrowDown = (event) => {
					if (!isOpen && event.keyCode === DOWN) {
						event.preventDefault();
						event.stopPropagation();
						onToggle();
					}
				};
				const mergedToggleProps = mergeProps(
					// @ts-ignore
					{
						className: classNames('components-dropdown-menu__toggle', {
							'is-opened': isOpen,
						}),
					},
					toggleProps
				);

				return (
					<EspressoButton
						{...mergedToggleProps}
						icon={icon}
						onClick={(event) => {
							onToggle(event);
							if (mergedToggleProps.onClick) {
								mergedToggleProps.onClick(event);
							}
						}}
						onKeyDown={(event) => {
							openOnArrowDown(event);
							if (mergedToggleProps.onKeyDown) {
								mergedToggleProps.onKeyDown(event);
							}
						}}
						aria-haspopup='true'
						aria-expanded={isOpen}
						label={label}
					>
						{mergedToggleProps.children}
					</EspressoButton>
				);
			}}
			renderContent={(props) => {
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
							const clonedElementProps = { className, onClose: props.onClose, role };
							return cloneElement(child, clonedElementProps);
						})}
					</NavigableMenu>
				);
			}}
		/>
	);
};

export default EspressoDropdownMenu;
