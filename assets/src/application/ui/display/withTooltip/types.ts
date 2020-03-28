import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface withTooltipProps {
	buttonText?: string;
	showOnMobile?: boolean;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
}
