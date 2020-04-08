import React from 'react';
import { Spinner as ChakraSpinner, ISpinnerProps } from '@chakra-ui/core';

const Spinner: React.FC<ISpinnerProps> = (props) => {
	return <ChakraSpinner {...props} />;
};

export default Spinner;
