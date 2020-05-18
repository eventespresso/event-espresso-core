import { theme as chakraTheme, DefaultTheme } from '@chakra-ui/core';

type CustomTheme = DefaultTheme;

const breakpoints = ['30em', '48.875em', '62em', '80em'];

// aliases

// @ts-ignore
breakpoints.sm = breakpoints[0];
// @ts-ignore
breakpoints.md = breakpoints[1];
// @ts-ignore
breakpoints.lg = breakpoints[2];
// @ts-ignore
breakpoints.xl = breakpoints[3];

const theme: CustomTheme = {
	...chakraTheme,
	breakpoints,
};

export default theme;
