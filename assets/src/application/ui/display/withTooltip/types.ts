import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface withTooltipProps {
	buttonText?: string;
	showTooltipOnMobile?: boolean;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
}
