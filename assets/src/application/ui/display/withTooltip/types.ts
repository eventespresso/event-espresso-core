import { TooltipProps } from '@infraUI/display';

export interface withTooltipProps {
	buttonText?: React.ReactNode;
	showTooltipOnMobile?: boolean;
	tooltip?: string;
	tooltipProps?: TooltipProps;
}
