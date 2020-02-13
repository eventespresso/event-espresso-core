import React from 'react';

export interface CalendarDateProps {
	editButton?: EditButtonProps;
	className?: string;
	headerText?: string | React.ReactNode;
	footerText?: string | React.ReactNode;
	onEdit?: clickHandler | keyPressHandler;
	showTime?: boolean;
}

export type clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type keyPressHandler = (event: React.KeyboardEventHandler<HTMLButtonElement>) => void;

export interface EditButtonProps {
	tooltip: string;
	tooltipPosition: string;
}
