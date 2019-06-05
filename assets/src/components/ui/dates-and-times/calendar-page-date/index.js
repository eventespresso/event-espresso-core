/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tooltip } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { ServerDateTime } from '@eventespresso/value-objects';
import { instanceOf } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * CalendarPageDate
 * Displays a date as if it were a page from
 * one of those mini calendars where each page is a day
 *
 * @function
 * @param {ServerDateTime} startDate 	DateTime defining the start of an Event
 * @param {ServerDateTime} endDate 	DateTime defining the end of an Event
 * @param {string} statusClass
 * @return {string} 			The date rendered to look like a calendar page
 */
class CalendarPageDate extends Component {
	static propTypes = {
		startDate: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.instanceOf( ServerDateTime ),
		] ),
		endDate: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.instanceOf( ServerDateTime ),
		] ),
		size: PropTypes.oneOf( [ 'tiny', 'small', 'medium', 'big' ] ),
		statusClass: PropTypes.string,
	};

	/**
	 * StartDate
	 *
	 * @function
	 * @param {ServerDateTime} startDate object
	 * @param {string} statusClass
	 * @return {string} The start date formatted to look like a calendar page
	 */
	getStartDate = ( startDate, statusClass ) => {
		return instanceOf( startDate, 'ServerDateTime' ) ? (
			<div className="ee-calendar-page-date-wrapper-start" >
				{ this.renderCalendarPage( startDate, statusClass ) }
			</div>
		) : null;
	};

	/**
	 * EndDate
	 *
	 * @function
	 * @param {ServerDateTime} endDate object
	 * @param {string} statusClass
	 * @return {string} The end date formatted to look like a calendar page
	 */
	getEndDate = ( endDate, statusClass ) => {
		return instanceOf( endDate, 'ServerDateTime' ) ? (
			<div className="ee-calendar-page-date-wrapper-end" >
				{ this.renderCalendarPage( endDate, statusClass, 'end' ) }
			</div>
		) : null;
	};

	/**
	 * getDivider
	 *
	 * @function
	 * @param {ServerDateTime} startDate object
	 * @param {ServerDateTime} endDate object
	 * @return {string} a separator between the start and end date
	 */
	getDivider = ( startDate, endDate ) => {
		return startDate && endDate ? (
			<div className="ee-calendar-page-date-to">
				{ __( 'TO', 'event_espresso' ) }
			</div>
		) : null;
	};

	/**
	 * renderCalendarPage
	 *
	 * @function
	 * @param {ServerDateTime} date object
	 * @param {string} statusClass
	 * @param {string} startOrEnd whether date is a start date or end date
	 * @return {string} The day formatted to look like a calendar page
	 */
	renderCalendarPage = ( date, statusClass, startOrEnd = 'start' ) => {
		const pageClass = classNames( {
			'ee-calendar-page-date-page': true,
			[ `ee-calendar-page-date-${ startOrEnd }` ]: true,
			[ statusClass ]: statusClass !== '',
		} );
		return (
			<Tooltip text={ date.toFormat( 'LLLL' ) } >
				<div className={ pageClass } >
					<div className={ 'ee-calendar-page-date-month' }>
						{ date.toFormat( 'MMM' ) }
					</div>
					<div className={ 'ee-calendar-page-date-day' }>
						{ date.toFormat( 'DD' ) }
					</div>
				</div>
			</Tooltip>
		);
	};

	render() {
		const {
			startDate = null,
			endDate = null,
			size = 'small',
			statusClass = '',
			...otherProps
		} = this.props;
		const htmlClass = classNames( {
			'ee-calendar-page-date-wrapper': true,
			[ `ee-calendar-page-date-${ size }` ]: true,

		} );
		return (
			<div className={ htmlClass } { ...otherProps } >
				{ this.getStartDate( startDate, statusClass ) }
				{ this.getDivider( startDate, endDate ) }
				{ this.getEndDate( endDate, statusClass ) }
			</div>
		);
	}
}

export default CalendarPageDate;
