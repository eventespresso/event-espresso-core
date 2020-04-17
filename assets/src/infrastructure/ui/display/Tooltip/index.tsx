import React from 'react';
import { Tooltip as ChakraTooltip } from '@chakra-ui/core';

import type { TooltipProps } from '../types';
import './style.scss';

const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
	const ariaLabel = props.title || props['aria-label'];
	const label = props.title;

	return (
		<ChakraTooltip {...props} aria-label={ariaLabel} className='ee-tooltip' label={label}>
			{children && children}
		</ChakraTooltip>
	);
};

export default Tooltip;
