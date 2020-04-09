import React, { useCallback } from 'react';
import { Button, Collapse as ChakraCollapse, CollapseProps } from '@chakra-ui/core';

interface Props extends CollapseProps {
	buttonText?: string;
}

const Collapse: React.FC<Props> = ({ buttonText, children, ...props }) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = useCallback(() => setShow(!show), [show]);

	return (
		<>
			<Button size='sm' onClick={handleToggle} mt='1rem'>
				{show ? 'Hide' : 'Show'} {buttonText && buttonText}
			</Button>
			<ChakraCollapse {...props} isOpen={show} mt={4}>
				{children}
			</ChakraCollapse>
		</>
	);
};

export default Collapse;
