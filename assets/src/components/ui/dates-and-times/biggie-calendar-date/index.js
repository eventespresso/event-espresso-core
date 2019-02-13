/**
 * External imports
 */
// import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * Displays a full calendar date, but REALLY BIG!!!
 *
 * @function
 * @param {string} position
 * @param {DateTime} date
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
	// console.log( 'BiggieCalendarDate date: ', date );
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
					{ date.toFormat( 'dddd' ) }
				</div>
				<div className="month">
					{ date.toFormat( 'MMMM' ) }
				</div>
				<div className="month-day-sep"></div>
				<div className="day">
					{ date.toFormat( 'DD' ) }
				</div>
				<div className="year">
					{ date.toFormat( 'YYYY' ) }
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
