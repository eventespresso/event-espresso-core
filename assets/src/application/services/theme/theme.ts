import { theme as chakraTheme, DefaultTheme } from '@chakra-ui/core';

type CustomTheme = DefaultTheme;

const breakpoints: any = ['30em', '48.875em', '62em', '80em'];

// aliases

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const theme: CustomTheme = {
	...chakraTheme,
	breakpoints,
};

export default theme;
