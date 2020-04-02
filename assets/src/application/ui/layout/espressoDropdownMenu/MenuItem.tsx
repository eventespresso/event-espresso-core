import React from 'react';

import { useFocusOnMount } from '@appServices/hooks';
import { ButtonType, EspressoButton, EspressoButtonType } from '@application/ui/input';
import { EspressoDropdownMenuItemProps as Props } from './types';

const MenuItem = (
	{ focusOnMount = false, icon, onClick, title, ...props }: Props,
	ref: React.RefObject<ButtonType>
) => {
	useFocusOnMount(focusOnMount, ref);
	return (
		<EspressoButton
			{...props}
			buttonText={title}
			buttonType={EspressoButtonType.MINIMAL}
			icon={icon}
			onClick={(event: React.MouseEvent) => {
				event.preventDefault();
				if (onClick) {
					onClick();
				}
			}}
			ref={ref}
		/>
	);
};

export default React.forwardRef<ButtonType, Props>(MenuItem);
