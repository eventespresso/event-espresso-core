import React from 'react';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

import { Icon } from '../../display/espressoIcon';
import { NativeButtonProps } from 'antd/lib/button/button';

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
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
}

export interface EspressoButtonProps extends Partial<NativeButtonProps> {
	buttonProps?: object;
	buttonSize?: EspressoButtonSize;
	buttonText?: string;
	buttonType?: EspressoButtonType;
	className?: string;
	disabled?: boolean;
	onClick: ClickHandler;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
	[key: string]: any;
}
