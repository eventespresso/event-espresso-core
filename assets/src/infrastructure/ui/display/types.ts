import { TooltipProps as ChakraTooltipProps } from '@chakra-ui/core';

export interface TooltipProps extends Omit<ChakraTooltipProps, 'aria-label'> {
	['aria-label']?: string;
	title: string;
}
