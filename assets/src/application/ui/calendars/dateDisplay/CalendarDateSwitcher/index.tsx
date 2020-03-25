import React from '@wordpress/element';
import { BiggieCalendarDate, CalendarDateRange } from '../';
import { __ } from '@wordpress/i18n';

// const { getBackgroundColorClass, getDateTimeStatusTextLabel } = dateTimeModel;

const CalendarDateSwitcher = ({ eventDate, showDate }) => {
	let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';

	sidebarColorClass += getBackgroundColorClass(eventDate);

	const dateStatus = (
		<div key={1} className={'ee-status-tag'}>
			{getDateTimeStatusTextLabel(eventDate)}
		</div>
	);

	switch (showDate) {
		case 'end':
			const endTime = eventDate.end.toFormat('h:mm a');
			return (
				<BiggieCalendarDate
					className={sidebarColorClass}
					date={eventDate.end}
					headerText={__('ends', 'event_espresso')}
					footerText={[endTime, dateStatus]}
				/>
			);
		case 'both':
			return (
				<CalendarDateRange
					className={sidebarColorClass}
					endDate={eventDate.end}
					headerText={__('Event Date', 'event_espresso')}
					footerText={dateStatus}
					showTime
					startDate={eventDate.start}
				/>
			);
		case 'start':
		default:
			const startTime = eventDate.start.toFormat('h:mm a');
			return (
				<BiggieCalendarDate
					className={sidebarColorClass}
					date={eventDate.start}
					headerText={__('starts', 'event_espresso')}
					footerText={[startTime, dateStatus]}
				/>
			);
	}
};

export default React.memo(CalendarDateSwitcher);
