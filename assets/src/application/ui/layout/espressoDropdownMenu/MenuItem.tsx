import React from 'react';

import { EspressoButton } from '@application/ui/input';
import { EspressoDropdownMenuItemProps as Props } from './types';

const EspressoDropdownMenuItem: React.FC<Props> = ({ icon, onClick, title, ...props }) => {
	// console.log('EspressoDropdownMenuItem props', props);

	return (
		<EspressoButton
			{...props}
			buttonText={title}
			icon={icon}
			onClick={(e) => {
				e.stopPropagation();
				props.onClose();
				if (onClick) {
					onClick();
				}
			}}
		/>
	);
};

export default EspressoDropdownMenuItem;
