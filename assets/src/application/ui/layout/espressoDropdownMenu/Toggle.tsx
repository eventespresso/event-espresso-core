import React from 'react';
import classNames from 'classnames';
import { DOWN } from '@wordpress/keycodes';

import { AnyObject } from '@appServices/utilities/types';
import { EspressoButton } from '@application/ui/input';
import { mergeProps } from './utils';

interface Props extends AnyObject {
	icon?: string;
	isOpen: boolean;
	label: string;
	onToggle?: (event: React.SyntheticEvent) => void;
	toggleProps?: AnyObject;
}

const Toggle: React.FC<Props> = ({ icon, isOpen, label, onToggle, toggleProps }) => {
	const openOnArrowDown = (event) => {
		if (!isOpen && event.keyCode === DOWN) {
			event.preventDefault();
			event.stopPropagation();
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
			onClick={(event: React.SyntheticEvent) => {
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
};

export default Toggle;
