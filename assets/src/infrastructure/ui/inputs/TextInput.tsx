import React, { useCallback } from 'react';
import { Input as ChakraInput } from '@chakra-ui/core';

import type { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({ onChange, onChangeValue, ...props }) => {
	const onChangeHandler: TextInputProps['onChange'] = useCallback(
		(event) => {
			if (typeof onChangeValue === 'function') {
				onChangeValue(event.target.value, event);
			}

			if (typeof onChange === 'function') {
				onChange(event);
			}
		},
		[onChange, onChangeValue]
	);

	return <ChakraInput {...props} onChange={onChangeHandler} />;
};

export default TextInput;
