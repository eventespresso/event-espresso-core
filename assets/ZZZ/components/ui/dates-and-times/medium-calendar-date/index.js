/**
 * External imports
 */
import classNames from 'classnames';
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
 * @param {boolean} showTime
 * @return {string} rendered date
 */
const MediumCalendarDate = ( {
	date,
	headerText,
	footerText,
	htmlClass = '',
	position = 'left',
	addWrapper = false,
	showTime = false,
} ) => {

	const classes = classNames(
		htmlClass,
		'ee-medium-calendar-date-wrapper',
		{
			'ee-mcd-pos-left': position === 'left',
			'ee-mcd-pos-right': position !== 'left'
		}
	);
	const mediumDate = (
		<Fragment>
			{
				headerText && (
					<div className="ee-medium-calendar-date-header">
						{ headerText }
					</div>
				)
			}
			<div className="ee-medium-calendar-date">
				<div className="ee-mcd-weekday">
					{ date.toFormat( 'dddd' ) }
				</div>
				<div className="ee-mcd-month-day">
					<span className="ee-mcd-month">
						{ date.toFormat( 'MMM' ) }
					</span>
					<span className="ee-mcd-day">
						{ date.toFormat( 'DD' ) }
					</span>
				</div>
				<div className="ee-mcd-year">
					{ date.toFormat( 'YYYY' ) }
				{
					showTime && (
						<span className="ee-mcd-time">
							&nbsp;{ date.toFormat( 'h:mm a' ) }
						</span>
					)
				}
				</div>
				{
					footerText && (
						<div className="ee-medium-calendar-date-footer">
							{ footerText }
						</div>
					)
				}
			</div>
		</Fragment>
	);
	return addWrapper ? (
		<div className={ classes }>{ mediumDate }</div>
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
	showTime: PropTypes.bool,
};

export default MediumCalendarDate;
