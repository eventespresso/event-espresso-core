import React from 'react';
import { NativeButtonProps } from 'antd/lib/button/button';
import { Icon as EspressoIcon } from '../../display';
import { withLabelProps, withTooltipProps } from '../../display';

export type ClickHandler = (click?: React.MouseEvent<HTMLElement>) => void;

export enum EspressoButtonSize {
	TINY = 18,
	SMALL = 21,
	DEFAULT = 24,
	BIG = 27,
	HUGE = 30,
}

export enum EspressoButtonType {
	ACCENT = 'ACCENT',
	DEFAULT = 'DEFAULT',
	MINIMAL = 'MINIMAL',
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
}

export interface EspressoButtonProps
	extends Partial<NativeButtonProps>,
		Partial<withLabelProps>,
		Partial<withTooltipProps> {
	buttonSize?: EspressoButtonSize;
	buttonText?: string;
	buttonType?: EspressoButtonType;
	className?: string;
	disabled?: boolean;
	onClick?: ClickHandler;
	icon?: EspressoIcon | React.ReactNode;
	[key: string]: any;
}

export { EspressoIcon as Icon };
