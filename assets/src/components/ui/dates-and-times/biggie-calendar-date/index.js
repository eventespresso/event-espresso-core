/**
 * External imports
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * Displays a full calendar date, but REALLY BIG!!!
 *
 * @function
 * @param {string} position
 * @param {string} date
 * @param {string} htmlClass
 * @param {string} headerText
 * @param {string} footerText
 * @return {string} rendered date
 */
const BiggieCalendarDate = ( {
	date,
	htmlClass,
	headerText,
	footerText,
	position = 'left',
} ) => {
	if ( ! moment.isMoment( date ) ) {
		date = date instanceof Date ? date : new Date( date );
		date = moment( date );
	}
	htmlClass = htmlClass ?
		`${ htmlClass } biggie-calendar-date-bg` :
		'biggie-calendar-date-bg';
	htmlClass = position === 'left' ?
		`${ htmlClass } bcd-pos-left` :
		`${ htmlClass } bcd-pos-right`;
	return (
		<div className={ htmlClass }>
			{
				headerText &&(
					<div className="biggie-calendar-date-header">
						{ headerText }
					</div>
				)
			}
			<div className="biggie-calendar-date">
				<div className="weekday">
					{ date.format( 'dddd' ) }
				</div>
				<div className="month">
					{ date.format( 'MMMM' ) }
				</div>
				<div className="month-day-sep"></div>
				<div className="day">
					{ date.format( 'DD' ) }
				</div>
				<div className="year">
					{ date.format( 'YYYY' ) }
				</div>
			</div>
			{
				footerText && (
					<div className="biggie-calendar-date-footer">
						{ footerText }
					</div>
				)
			}
		</div>
	);
};

export default BiggieCalendarDate;
