import React from 'react';
import { withLabelProps, withTooltipProps } from '../../display';
import { ButtonProps as ButtonAdapterProps } from '@infraUI/inputs';

export type ClickHandler = (click?: React.MouseEvent<HTMLElement>) => void;

export enum ButtonSize {
	TINY = 18,
	SMALL = 21,
	DEFAULT = 24,
	BIG = 27,
	HUGE = 30,
}

export enum ButtonType {
	ACCENT = 'ACCENT',
	DEFAULT = 'DEFAULT',
	MINIMAL = 'MINIMAL',
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
}

export interface ButtonProps extends ButtonAdapterProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	buttonType?: ButtonType;
	buttonSize?: ButtonSize;
}

export interface IconButtonProps
	extends Omit<ButtonProps, 'children' | 'buttonText'>,
		Partial<withLabelProps>,
		Partial<withTooltipProps> {}
