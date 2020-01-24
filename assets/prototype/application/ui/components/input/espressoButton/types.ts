import React from 'react';

import { Icon } from '../../display/espressoIcon';

export type ClickHandler = (click?: React.MouseEvent<HTMLElement>) => void;

export enum EspressoButtonSize {
	TINY = 18,
	SMALL = 21,
	DEFAULT = 24,
	BIG = 27,
	HUGE = 30,
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
	icon?: Icon | string;
	onClick: ClickHandler;
	size?: EspressoButtonSize;
	style?: EspressoButtonStyle;
}
