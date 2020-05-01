import { withLabelProps, withTooltipProps } from '../../../display';
import { IconButtonProps as IconButtonAdapterProps } from '@infraUI/inputs';

export interface IconButtonProps extends IconButtonAdapterProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	borderless?: boolean;
	color?: 'white' | 'black';
}
