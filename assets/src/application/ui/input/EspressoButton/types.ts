import React from 'react';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

import { Icon } from '../../display/espressoIcon';

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

export interface EspressoButtonProps {
	buttonText?: string;
	buttonType?: EspressoButtonType;
	buttonProps?: object;
	className?: string;
	icon?: Icon | JSX.Element | string;
	onClick: ClickHandler;
	size?: EspressoButtonSize;
	tooltip?: string;
	tooltipProps?: Partial<TooltipPropsWithTitle>;
	[key: string]: any;
}
