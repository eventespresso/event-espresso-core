import React from 'react';
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription, AlertProps, IconProps } from '@chakra-ui/core';

interface Props extends AlertProps {
	description: string;
	iconProps?: IconProps;
	title: string;
}

const Alert: React.FC<Props> = ({ children, description, iconProps, title, ...props }) => (
	<ChakraAlert
		{...props}
		variant='subtle'
		flexDirection='column'
		justifyContent='center'
		textAlign='center'
		height='200px'
	>
		<AlertIcon size='40px' mr={0} {...iconProps} />
		<AlertTitle mt={4} mb={1} fontSize='lg'>
			{title}
		</AlertTitle>
		{description && <AlertDescription maxWidth='sm'>{description}</AlertDescription>}
		{children && children}
	</ChakraAlert>
);

export default Alert;
