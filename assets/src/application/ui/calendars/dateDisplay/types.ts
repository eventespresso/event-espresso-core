import React from 'react';
import type { LabelPosition } from '@appDisplay/withLabel';
import type { ButtonProps } from '../../input/Button';

export interface CalendarDateProps {
	className?: string;
	editDateButton?: JSX.Element;
	footerText?: string | React.ReactNode;
	headerText?: string | React.ReactNode;
	showTime?: boolean;
}

export type clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type keyPressHandler = (event: React.KeyboardEventHandler<HTMLButtonElement>) => void;

export interface EditDateButtonProps extends ButtonProps {
	endDate: string;
	header?: string;
	onEditHandler: (dates: string[]) => void;
	startDate: string;
	tooltip?: string;
	tooltipPosition?: LabelPosition;
}
