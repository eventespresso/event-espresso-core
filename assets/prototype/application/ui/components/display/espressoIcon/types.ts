export enum Icon {
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	REM = 'recurring-date',
	ROTATE = 'image-rotate',
	SAVE = 'save',
}

export interface EspressoIconProps {
	icon: Icon | string;
	svgSize?: number;
	className?: string;
	otherProps?: object;
}
