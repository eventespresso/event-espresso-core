import React from 'react';
import classNames from 'classnames';
import { Heading as ChakraHeading } from '@chakra-ui/core';

import { HeadingProps } from './types';

const Heading: React.FC<HeadingProps> = ({ children, ...props }) => {
	const className = classNames(props.className, 'ee-heading');

	return (
		<ChakraHeading {...props} className={className}>
			{children}
		</ChakraHeading>
	);
};

export default Heading;
