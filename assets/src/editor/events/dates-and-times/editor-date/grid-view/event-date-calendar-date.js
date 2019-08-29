/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	CalendarDateRange,
} from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';

const { getBackgroundColorClass, getDateTimeStatusTextLabel } = dateTimeModel;

const EventDateCalendarDate = ( { eventDate, showDate } ) => useMemo( () => {
	let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
	sidebarColorClass += getBackgroundColorClass( eventDate );
	const dateStatus = (
		<div key={ 1 } className={ 'ee-status-tag' }>
			{ getDateTimeStatusTextLabel( eventDate ) }
		</div>
	);
	switch ( showDate ) {
		case 'end' :
			const endTime = eventDate.end.toFormat( 'h:mm a' );
			return (
				<BiggieCalendarDate
					date={ eventDate.end }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'ends', 'event_espresso' ) }
					footerText={ [ endTime, dateStatus ] }
				/>
			);
		case 'both' :
			return (
				<CalendarDateRange
					startDate={ eventDate.start }
					endDate={ eventDate.end }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'Event Date', 'event_espresso' ) }
					footerText={ dateStatus }
					showTime
				/>
			);
		case 'start' :
		default :
			const startTime = eventDate.start.toFormat( 'h:mm a' );
			return (
				<BiggieCalendarDate
					date={ eventDate.start }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'starts', 'event_espresso' ) }
					footerText={ [ startTime, dateStatus ] }
				/>
			);
	}
}, [
	showDate,
	eventDate.start.toISO(),
	eventDate.end.toISO(),
	eventDate.regLimit,
	eventDate.sold,
	eventDate.deleted,
] );

export default EventDateCalendarDate;
