export enum EspressoButtonSize {
	TINY = 'TINY',
	SMALL = 'SMALL',
	BIG = 'BIG',
	HUGE = 'HUGE',
}

export enum EspressoButtonStyle {
	ACCENT = 'ACCENT',
	DEFAULT = 'DEFAULT',
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
}

export interface EspressoButtonProps {
	buttonText: string;
	buttonProps?: object;
	htmlClass?: string;
	icon?: string;
	onClick: () => null;
	size?: EspressoButtonSize;
	style?: EspressoButtonStyle;
}
