/**
 * External imports
 */
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { IconButton } from '@wordpress/components';
import { DateTime } from '@eventespresso/value-objects';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.css';
import { EspressoIcon } from '../../image/espresso-icon';

/**
 * Displays a full calendar date, but REALLY BIG!!!
 *
 * @function
 * @param {string} position
 * @param {DateTime} date
 * @param {string} htmlClass
 * @param {string} headerText
 * @param {string} footerText
 * @param {Function} onEdit
 * @param {Object} editButton
 * @return {string} rendered date
 */
const BiggieCalendarDate = ( {
	date,
	htmlClass,
	headerText,
	footerText,
	position = 'left',
	onEdit = null,
	editButton = {},
} ) => {
	htmlClass = classNames(
		'biggie-calendar-date-bg',
		htmlClass,
		{
			'bcd-pos-left': position === 'left',
			'bcd-pos-right': position !== 'left'
		}
	);
	const editDateButton = isFunction( onEdit ) ? (
		<IconButton
			className="ee-edit-calendar-date-btn"
			onClick={ ( event ) => onEdit( event ) }
			onKeyPress={ ( event ) => onEdit( event ) }
			tooltip={ editButton.tooltip }
			labelPosition={ editButton.tooltipPosition }
			icon={ <EspressoIcon icon="calendar"/> }
		/>
	): null;
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
			{ editDateButton }
		</div>
	);
};

BiggieCalendarDate.propTypes = {
	date: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.instanceOf( DateTime )
	] ),
	htmlClass: PropTypes.string,
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
	onEdit: PropTypes.func,
	editButton: PropTypes.object,
};

export default BiggieCalendarDate;
