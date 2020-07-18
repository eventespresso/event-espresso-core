import React from 'react';
import { LabelPosition } from '@appDisplay/withLabel';
import { ButtonProps } from '../../input/Button';

export interface CalendarDateProps {
	editDateButton?: JSX.Element;
	className?: string;
	headerText?: string | React.ReactNode;
	footerText?: string | React.ReactNode;
	showTime?: boolean;
}

export type clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type keyPressHandler = (event: React.KeyboardEventHandler<HTMLButtonElement>) => void;

export interface EditDateButtonProps extends ButtonProps {
	onEditHandler: (dates: string[]) => void;
	startDate: Date;
	endDate: Date;
	header?: string;
	tooltip?: string;
	tooltipPosition?: LabelPosition;
}
