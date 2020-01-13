import React from 'react';

export type ClickEvent = (click: React.MouseEvent<HTMLElement>) => void;

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
	onClick: ClickEvent;
	size?: EspressoButtonSize;
	style?: EspressoButtonStyle;
}
