import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface withTooltipProps {
	id?: string;
	showTooltipOnMobile?: boolean;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
}
