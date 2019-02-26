/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';
import { DateTime } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * Displays a full calendar date... just not so bigly
 *
 * @function
 * @param {DateTime} date
 * @param {string} headerText
 * @param {string} footerText
 * @param {string} htmlClass
 * @param {string} position
 * @param {boolean} addWrapper
 * @return {string} rendered date
 */
const MediumCalendarDate = ( {
	date,
	headerText,
	footerText,
	htmlClass = '',
	position = 'left',
	addWrapper = false,
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } medium-calendar-date-wrapper` :
		'medium-calendar-date-wrapper';
	htmlClass = position === 'left' ?
		`${ htmlClass } mcd-pos-left` :
		`${ htmlClass } mcd-pos-right`;
	const mediumDate = (
		<Fragment>
			{
				headerText && (
					<div className="medium-calendar-date-header">
						{ headerText }
					</div>
				)
			}
			<div className="medium-calendar-date">
				<div className="weekday">
					{ date.toFormat( 'dddd' ) }
				</div>
				<div className="month-day-year">
					{ date.toFormat( 'MMM DD' ) }
					<span>{ '/' }</span>
					{ date.toFormat( 'YY' ) }
				</div>
				{
					footerText && (
						<div className="medium-calendar-date-footer">
							{ footerText }
						</div>
					)
				}
			</div>
		</Fragment>
	);
	return addWrapper ? (
		<div className={ htmlClass }>{ mediumDate }</div>
	) : mediumDate;
};

MediumCalendarDate.propTypes = {
	date: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.instanceOf( DateTime )
	] ).isRequired,
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
	addWrapper: PropTypes.bool,
};

export default MediumCalendarDate;
