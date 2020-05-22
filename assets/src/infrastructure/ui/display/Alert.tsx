import React from 'react';
import { Alert as ChakraAlert, AlertProps, AlertIcon, IconProps } from '@chakra-ui/core';

interface Props extends AlertProps {
	description: string;
	iconProps?: IconProps;
}

const Alert: React.FC<Props> = ({ description, iconProps, ...props }) => (
	<ChakraAlert {...props}>
		<AlertIcon />
		{description}
	</ChakraAlert>
);

export default Alert;
