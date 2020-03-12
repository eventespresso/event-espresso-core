import React from 'react';
import classnames from 'classnames';
import { flatMap, isEmpty, isFunction } from 'lodash'; // to be replaced with ramda
import { DOWN } from '@wordpress/keycodes';
import { Dropdown, NavigableMenu } from '@wordpress/components';

import { AnyObject } from '@appServices/utilities/types';
import { EspressoButton } from '@application/ui/input';

import './style.scss';

type Props = {
	children(props: AnyObject): JSX.Element;
	className?: string;
	controls?: [];
	icon?: string | null;
	menuProps?: AnyObject;
	label: string;
	popoverProps?: AnyObject;
	toggleProps?: AnyObject;
	[key: string]: any;
};

const mergeProps = (defaultProps: Props, props: Props) => {
	const mergedProps = {
		...defaultProps,
		...props,
	};

	if (props.className && defaultProps.className) {
		mergedProps.className = classnames(props.className, defaultProps.className);
	}

	return mergedProps;
};

const DropdownMenu: React.FC<Props> = ({
	children,
	className,
	controls,
	icon = 'menu',
	label,
	popoverProps,
	toggleProps,
	menuProps,
}) => {
	if (isEmpty(controls) && !isFunction(children)) {
		return null;
	}

	// Normalize controls to nested array of objects (sets of controls)
	let controlSets;
	if (!isEmpty(controls)) {
		controlSets = controls;
		if (!Array.isArray(controlSets[0])) {
			controlSets = [controlSets];
		}
	}
	const mergedPopoverProps = mergeProps(
		// @ts-ignore
		{
			className: 'components-dropdown-menu__popover',
		},
		popoverProps
	);

	return (
		<div className='ee-dropdown-menu'>
			<Dropdown
				className={classnames(' components-dropdown-menu', className)}
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
							className: classnames('components-dropdown-menu__toggle', {
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
							showTooltip
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
							className: classnames('components-dropdown-menu__menu'),
						},
						menuProps
					);

					return (
						<NavigableMenu {...mergedMenuProps} role='menu'>
							{isFunction(children) ? children(props) : null}
							{flatMap(controlSets, (controlSet, indexOfSet) =>
								controlSet.map((control, indexOfControl) => (
									<EspressoButton
										key={[indexOfSet, indexOfControl].join()}
										onClick={(event) => {
											event.stopPropagation();
											props.onClose();
											if (control.onClick) {
												control.onClick();
											}
										}}
										className={classnames('components-dropdown-menu__menu-item', {
											'has-separator': indexOfSet > 0 && indexOfControl === 0,
											'is-active': control.isActive,
										})}
										icon={control.icon}
										aria-checked={
											control.role === 'menuitemcheckbox' || control.role === 'menuitemradio'
												? control.isActive
												: undefined
										}
										role={
											control.role === 'menuitemcheckbox' || control.role === 'menuitemradio'
												? control.role
												: 'menuitem'
										}
										disabled={control.isDisabled}
									>
										{control.title}
									</EspressoButton>
								))
							)}
						</NavigableMenu>
					);
				}}
			/>
		</div>
	);
};

export default DropdownMenu;
