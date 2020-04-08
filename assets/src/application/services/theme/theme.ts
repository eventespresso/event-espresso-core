import { theme as chakraTheme, DefaultTheme } from '@chakra-ui/core';

type CustomTheme = DefaultTheme;

const theme: CustomTheme = {
	...chakraTheme,
};

export default theme;
