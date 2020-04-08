import React, { useCallback } from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/core';

import type { SwitchProps } from './types';

const Switch: React.FC<SwitchProps> = ({ onChange, onChangeValue, ...props }) => {
	const onChangeHandler: SwitchProps['onChange'] = useCallback(
		(event) => {
			if (typeof onChangeValue === 'function') {
				onChangeValue((event.target as HTMLInputElement).checked, event);
			}

			if (typeof onChange === 'function') {
				onChange(event);
			}
		},
		[onChange, onChangeValue]
	);

	return <ChakraSwitch {...props} onChange={onChangeHandler} />;
};

export default Switch;
