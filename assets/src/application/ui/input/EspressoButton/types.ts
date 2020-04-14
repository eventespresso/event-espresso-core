import React from 'react';
import { Icon as EspressoIcon } from '../../display';
import { withLabelProps, withTooltipProps } from '../../display';
import { ButtonProps } from '@infraUI/inputs';

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

export interface EspressoButtonProps extends ButtonProps, Partial<withLabelProps>, Partial<withTooltipProps> {
	buttonType?: EspressoButtonType;
	buttonSize?: EspressoButtonSize;
}

export interface EspressoIconButtonProps
	extends Omit<ButtonProps, 'children' | 'buttonText'>,
		Partial<withLabelProps>,
		Partial<withTooltipProps> {}
