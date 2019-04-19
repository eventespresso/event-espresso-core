/**
 * External imports
 */
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';
import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import './style.css';
import { default as CalendarPageDate } from '../calendar-page-date';

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
 * @return {Object} rendered date
 */
const CalendarDateRange = ( {
	startDate,
	endDate,
	headerText,
	footerText,
	htmlClass = '',
	position = 'left',
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-calendar-date-range-wrapper` :
		'ee-calendar-date-range-wrapper';
	htmlClass = position === 'left' ?
		`${ htmlClass } cdr-pos-left` :
		`${ htmlClass } cdr-pos-right`;
	headerText = headerText && (
		<div className="ee-calendar-date-range-header">
			{ headerText }
		</div>
	);
	footerText = footerText && (
		<div className="ee-calendar-date-range-footer">
			{ footerText }
		</div>
	);
	return (
		<div className={ htmlClass }>
			{ headerText }
			<div className="ee-cdr-start-date">
				<div className="ee-cdr-weekday">
					{ startDate.toFormat( 'dddd' ) }
				</div>
				<CalendarPageDate startDate={ startDate } />
			</div>
			<div className="ee-calendar-date-range-separator">
				{ __( 'to', 'event_espresso' ) }
			</div>
			<div className="ee-cdr-end-date">
				<div className="ee-cdr-weekday">
					{ endDate.toFormat( 'dddd' ) }
				</div>
				<CalendarPageDate endDate={ endDate } />
			</div>
			<div className="ee-clear-float"></div>
			<div className="ee-cdr-time">
				<span className="ee-cdr-start-time">
					{ startDate.toFormat( 'h:mm a' ) }
				</span>
				<span className="ee-calendar-time-separator">
					{ __( '-', 'event_espresso' ) }
				</span>
				<span className="ee-cdr-time">
					{ endDate.toFormat( 'h:mm a' ) }
				</span>
			</div>
			{ footerText }
		</div>
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
};

export default CalendarDateRange;
