export interface EspressoIconProps {
	icon: Icon | keyof SvgPath;
	svgSize?: number;
	className?: string;
	otherProps?: object;
	isPressed?: boolean;
}

export enum Icon {
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	REM = 'recurring-date',
	ROTATE = 'image-rotate',
	SAVE = 'save',
	EDIT = 'edit',
	TICKET_ALT = 'ticket-alt',
	TRASH = 'trash',
	FILTER = 'filter',
}

export type SvgPath = {
	[key in Icon]: string;
};
