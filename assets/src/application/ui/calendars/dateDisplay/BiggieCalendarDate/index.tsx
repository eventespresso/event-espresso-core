import classNames from 'classnames';
import { format, isValid } from 'date-fns';
import React from 'react';

/**
 * Internal dependencies
 */
import './style.css';
import EspressoButton from '@appInputs/EspressoButton';

export interface EditButtonProps {
	tooltip: string;
	tooltipPosition: string;
}

export enum Position {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface BiggieCalendarDateProps {
	date: Date;
	editButton: EditButtonProps;
	htmlClass: string;
	headerText: string[] | string;
	footerText: string[] | string;
	onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
	position: Position;
	showTime: boolean;
}

/**
 * Displays a full calendar date, but REALLY BIG!!!
 */
export const BiggieCalendarDate: React.FC<BiggieCalendarDateProps> = ({
	date,
	htmlClass,
	headerText,
	footerText,
	position = Position.LEFT,
	onEdit = null,
	editButton = {},
	showTime = false,
}) => {
	if (!isValid(date)) {
		return null;
	}
	const classes = classNames('ee-biggie-calendar-date-bg', htmlClass, {
		'ee-bcd-pos-left': position === Position.LEFT,
		'ee-bcd-pos-right': position !== Position.LEFT,
	});
	const editDateButton =
		typeof onEdit === 'function' ? (
			<EspressoButton
				className='ee-edit-calendar-date-btn'
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => onEdit(event)}
				onKeyPress={(event: React.MouseEvent<HTMLButtonElement>) => onEdit(event)}
				tooltip={editButton.tooltip}
				labelPosition={editButton.tooltipPosition}
				icon='calendar'
			/>
		) : null;
	return (
		<div className={classes}>
			{headerText && <div className='ee-biggie-calendar-date-header'>{headerText}</div>}
			<div className='ee-biggie-calendar-date'>
				<div className='ee-bcd-weekday'>{format(date, 'eeee')}</div>
				<div className='ee-bcd-month'>{format(date, 'MMMM')}</div>
				<div className='ee-bcd-month-day-sep'></div>
				<div className='ee-bcd-day'>{format(date, 'ee')}</div>
				<div className='ee-bcd-year'>{format(date, 'yyyy')}</div>
				{showTime && <div className='ee-bcd-time'>{format(date, 'h:mm a')}</div>}
			</div>
			{footerText && <div className='ee-biggie-calendar-date-footer'>{footerText}</div>}
			{editDateButton}
		</div>
	);
};
