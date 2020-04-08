import React from 'react';
import {
	NumberInput as ChakraNumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/core';

import type { NumberInputProps } from './types';

const NumberInput: React.FC<NumberInputProps> = ({
	inputFieldProps,
	inputStepperProps,
	incrementStepperProps,
	decrementStepperProps,
	...numberInputProps
}) => {
	return (
		<ChakraNumberInput {...numberInputProps}>
			<NumberInputField {...inputFieldProps} />
			<NumberInputStepper {...inputStepperProps}>
				<NumberIncrementStepper {...incrementStepperProps} />
				<NumberDecrementStepper {...decrementStepperProps} />
			</NumberInputStepper>
		</ChakraNumberInput>
	);
};

export default NumberInput;
