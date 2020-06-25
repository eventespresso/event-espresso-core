import React from 'react';
import classNames from 'classnames';
import { Tooltip as ChakraTooltip } from '@chakra-ui/core';

import type { TooltipProps } from '../types';

const Tooltip: React.FC<TooltipProps> = ({ children, tooltip, ...props }) => {
	const ariaLabel = tooltip || props['aria-label'];
	const className = classNames(props.className, 'ee-tooltip');


	return (
		<ChakraTooltip
			{...props}
			aria-label={ariaLabel}
			className={className}
			closeOnClick
			hideDelay={250}
			label={tooltip}
			showDelay={500}
		>
			{children && children}
		</ChakraTooltip>
	);
};

export default Tooltip;
