import React from 'react';
import { Alert as ChakraAlert, AlertIcon, AlertTitle, AlertDescription, AlertProps, IconProps } from '@chakra-ui/core';

interface Props extends AlertProps {
	description: string;
	iconProps?: IconProps;
	title: string;
}

const Banner: React.FC<Props> = ({ children, description, iconProps, title, ...props }) => (
	<ChakraAlert flexDirection='column' justifyContent='center' pb='4' pt='8' textAlign='center' {...props}>
		<AlertIcon size='2.5rem' mr={0} {...iconProps} />
		{title && (
			<AlertTitle mt={4} mb={2} fontSize='lg'>
				{title}
			</AlertTitle>
		)}
		{description && (
			<AlertDescription maxWidth='xl' mb={6}>
				{description}
			</AlertDescription>
		)}
		{children && children}
	</ChakraAlert>
);

export default Banner;
