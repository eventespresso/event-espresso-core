import React from 'react';
import { withLabelProps, withTooltipProps } from '../../display';
import { ButtonProps as ButtonAdapterProps } from '@infraUI/inputs';

export type ClickHandler = (click?: React.MouseEvent<HTMLElement>) => void;

export enum ButtonSize {
	TINY = 'tiny',
	SMALL = 'small',
	DEFAULT = 'default',
	BIG = 'big',
	HUGE = 'huge',
}

export enum ButtonType {
	ACCENT = 'accent',
	DEFAULT = 'default',
	MINIMAL = 'minimal',
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

export interface ButtonProps extends ButtonAdapterProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	active?: boolean;
	buttonType?: ButtonType;
	buttonSize?: ButtonSize;
}

export interface LinkProps extends Partial<withTooltipProps> {
	className?: string;
	external?: boolean;
	href?: string;
	icon?: React.ReactNode;
}
