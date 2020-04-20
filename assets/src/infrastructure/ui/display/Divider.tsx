import React from 'react';
import { Divider as ChakraDivider } from '@chakra-ui/core';

import { DividerProps } from './types';

const Divider: React.FC<DividerProps> = ({ children, dashed, ...props }) => {
	const borderStyle = dashed ? 'dashed' : 'none';

	return (
		<ChakraDivider {...props} borderStyle={borderStyle}>
			{children}
		</ChakraDivider>
	);
};

export default Divider;
