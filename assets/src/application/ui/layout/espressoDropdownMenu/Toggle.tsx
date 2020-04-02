import React from 'react';
import classNames from 'classnames';
import { DOWN } from '@wordpress/keycodes';

import { AnyObject } from '@appServices/utilities/types';
import { ButtonType, EspressoButton } from '@application/ui/input';
import { mergeProps } from './utils';

interface Props extends AnyObject {
	icon?: string;
	isOpen: boolean;
	label: string;
	onToggle?: (event: React.SyntheticEvent) => void;
	toggleProps?: AnyObject;
}

const Toggle = React.forwardRef<ButtonType, Props>(({ icon, isOpen, label, onToggle, toggleProps }, ref) => {
	const openOnArrowDown = (event: React.KeyboardEvent) => {
		console.log('%c onToggle openOnArrowDown()', 'color: DeepSkyBlue;');
		console.log('%c 	isOpen', 'color: DeepSkyBlue;', isOpen);
		console.log('%c 	event', 'color: DeepSkyBlue;', event);
		if (!isOpen && event.keyCode === DOWN) {
			onToggle(event);
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
			onClick={(event: React.MouseEvent) => {
				onToggle(event);
				if (mergedToggleProps.onClick) {
					mergedToggleProps.onClick(event);
				}
			}}
			onKeyDown={(event: React.KeyboardEvent) => {
				openOnArrowDown(event);
				if (mergedToggleProps.onKeyDown) {
					mergedToggleProps.onKeyDown(event);
				}
			}}
			aria-haspopup='true'
			aria-expanded={isOpen}
			tooltip={label}
			ref={ref}
		>
			{mergedToggleProps.children}
		</EspressoButton>
	);
});

export default Toggle;
