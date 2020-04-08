import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/core';

import type { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = (props) => {
	return <ChakraInput {...props} />;
};

export default TextInput;
