import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Input as ChakraInput } from '@chakra-ui/core';

import type { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({ onChange, onChangeValue, ...props }) => {
	const className = classNames('ee-input-base ee-input', props.className);
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

	return <ChakraInput {...props} className={className} onChange={onChangeHandler} />;
};

export default TextInput;
