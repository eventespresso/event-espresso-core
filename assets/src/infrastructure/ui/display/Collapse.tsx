import React from 'react';
import { Collapse as ChakraCollapse, CollapseProps } from '@chakra-ui/core';

const Collapse: React.FC<CollapseProps> = ({ children, isOpen, ...props }) => (
	<ChakraCollapse {...props} isOpen={isOpen} mt={4}>
		{children}
	</ChakraCollapse>
);

export default Collapse;
