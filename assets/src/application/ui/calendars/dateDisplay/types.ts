export interface CalendarDateProps {
	position: CalendarPosition;
	editButton?: EditButtonProps;
	htmlClass?: string;
	headerText?: string | React.ReactNode;
	footerText?: string | React.ReactNode;
	onEdit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	showTime?: boolean;
}

export enum CalendarPosition {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface EditButtonProps {
	tooltip: string;
	tooltipPosition: string;
}
