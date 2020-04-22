import { theme as chakraTheme, DefaultTheme } from '@chakra-ui/core';

type CustomTheme = DefaultTheme;

const zIndices = { ...chakraTheme.zIndices, popover: 1501 };

const theme: CustomTheme = {
	...chakraTheme,
	zIndices,
};

export default theme;
