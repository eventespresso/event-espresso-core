/**
 * External imports
 */
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';
import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import BiggieCalendarDate from '../biggie-calendar-date';
import MediumCalendarDate from '../medium-calendar-date';

/**
 * Displays a pair of calendar dates representing a date range
 *
 * @function
 * @param {DateTime} startDate
 * @param {DateTime} endDate
 * @param {string} headerText
 * @param {string} footerText
 * @param {string} htmlClass
 * @param {string} position
 * @param {boolean} showTime
 * @return {Object} rendered date
 */
const CalendarDateRange = ( {
	startDate,
	endDate,
	headerText = '',
	footerText = '',
	htmlClass = '',
	position = 'left',
	showTime = false,
} ) => {
	if (
		startDate.toFormat( 'YY-MM-DD' ) !== endDate.toFormat( 'YY-MM-DD' )
	) {
		return (
			<MediumCalendarDate
				date={ startDate }
				htmlClass={ htmlClass }
				position={ position }
				showTime={ showTime }
				addWrapper
				footerText={
					<MediumCalendarDate
						key={ 'end-date' }
						date={ endDate }
						headerText={ __( 'to', 'event_espresso' ) }
						showTime={ showTime }
						footerText={ footerText }
					/>
				}
			/>
		)
	}
	let time = startDate.toFormat( 'h:mm a - ' );
	time += endDate.toFormat( 'h:mm a' );
	headerText = headerText ? headerText : <span>&nbsp;</span>;
	return (
		<BiggieCalendarDate
			date={ startDate }
			htmlClass={ htmlClass }
			headerText={ headerText }
			footerText={ [ time, footerText ] }
			position={ position }
		/>
	);
};

CalendarDateRange.propTypes = {
	startDate: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.instanceOf( DateTime )
	] ).isRequired,
	endDate: PropTypes.instanceOf( DateTime ).isRequired,
	headerText: PropTypes.oneOfType( [
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	] ),
	footerText: PropTypes.oneOfType( [
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	] ),
	htmlClass: PropTypes.string,
	position: PropTypes.string,
	showTime: PropTypes.bool,
};

export default CalendarDateRange;
