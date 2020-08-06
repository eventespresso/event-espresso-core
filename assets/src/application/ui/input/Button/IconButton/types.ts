import { withLabelProps, withTooltipProps } from '../../../display';
import { IconButtonProps as IconButtonAdapterProps } from '@infraUI/inputs';

export interface IconButtonProps
	extends Omit<IconButtonAdapterProps, 'aria-label'>,
		Partial<withLabelProps>,
		Partial<withTooltipProps> {
	'aria-label'?: string;
	borderless?: boolean;
	color?: 'white' | 'black';
}
