import React from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/core';

import type { TextareaProps } from './types';

const TextArea: React.FC<TextareaProps> = (props) => {
	return <ChakraTextarea {...props} />;
};

export default TextArea;
