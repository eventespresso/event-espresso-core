import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface withTooltipProps {
	buttonText?: React.ReactNode;
	showTooltipOnMobile?: boolean;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
}
