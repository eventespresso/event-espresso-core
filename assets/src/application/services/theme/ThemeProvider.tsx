import React from 'react';
import { ThemeProvider as ChakraThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from './theme';

const ThemeProvider: React.FC = ({ children }) => {
	return (
		<ChakraThemeProvider theme={theme}>
			<CSSReset />
			{children}
		</ChakraThemeProvider>
	);
};

export default ThemeProvider;
