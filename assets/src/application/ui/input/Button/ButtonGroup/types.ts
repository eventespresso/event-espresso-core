import { ButtonGroupProps as ChakraButtonGroupProps } from '@infraUI/inputs';
import { ButtonSize } from '@application/ui/input';

export interface ButtonGroupProps extends ChakraButtonGroupProps {
	buttonSize?: ButtonSize;
}
