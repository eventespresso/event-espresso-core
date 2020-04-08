import React from 'react';
import { Switch as ChakraSwitch } from '@chakra-ui/core';

import type { SwitchProps } from './types';

const Switch: React.FC<SwitchProps> = (props) => {
	return <ChakraSwitch {...props} />;
};

export default Switch;
