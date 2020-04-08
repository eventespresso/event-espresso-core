import React from 'react';
import { ThemeProvider as ChakraThemeProvider } from '@chakra-ui/core';

import theme from './theme';

const ThemeProvider: React.FC = ({ children }) => {
	return <ChakraThemeProvider theme={theme}>{children}</ChakraThemeProvider>;
};

export default ThemeProvider;
