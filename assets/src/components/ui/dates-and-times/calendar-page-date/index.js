/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { DateTime } from '@eventespresso/value-objects';
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
 * @param {DateTime} startDate 	DateTime defining the start of an Event
 * @param {DateTime} endDate 	DateTime defining the end of an Event
 * @param {string} statusClass
 * @return {string} 			The date rendered to look like a calendar page
 */
class CalendarPageDate extends Component {
	static propTypes = {
		startDate: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.instanceOf( DateTime )
		] ),
		endDate: PropTypes.oneOfType( [
			PropTypes.object,
			PropTypes.instanceOf( DateTime )
		] ),
		size: PropTypes.oneOf( [ 'tiny', 'small', 'medium', 'big' ] ),
		statusClass: PropTypes.string,
	};

	/**
	 * StartDate
	 *
	 * @function
	 * @param {DateTime} startDate object
	 * @param {string} statusClass
	 * @return {string} The start date formatted to look like a calendar page
	 */
	getStartDate = ( startDate, statusClass ) => {
		return instanceOf( startDate, 'DateTime' ) ? (
			<div className="ee-calendar-page-date-wrapper-start" >
				{ this.renderCalendarPage( startDate, statusClass ) }
			</div>
		) : null;
	};

	/**
	 * EndDate
	 *
	 * @function
	 * @param {DateTime} endDate object
	 * @param {string} statusClass
	 * @return {string} The end date formatted to look like a calendar page
	 */
	getEndDate = ( endDate, statusClass ) => {
		return instanceOf( endDate, 'DateTime' ) ? (
			<div className="ee-calendar-page-date-wrapper-end" >
				{ this.renderCalendarPage( endDate, statusClass, 'end' ) }
			</div>
		) : null;
	};

	/**
	 * getDivider
	 *
	 * @function
	 * @param {DateTime} startDate object
	 * @param {DateTime} endDate object
	 * @return {string} a separator between the start and end date
	 */
	getDivider = ( startDate, endDate  ) => {
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
	 * @param {DateTime} date object
	 * @param {string} statusClass
	 * @param {string} startOrEnd whether date is a start date or end date
	 * @return {string} The day formatted to look like a calendar page
	 */
	renderCalendarPage = ( date, statusClass, startOrEnd = 'start' ) => {
		let htmlClass = `ee-calendar-page-date-month ${ statusClass }`;
		return (
			<div className={
				'ee-calendar-page-date-' +
				startOrEnd +
				' ee-calendar-page-date-page'
			}>
				<div className={ htmlClass }>
					{ date.toFormat( 'MMM' ) }
				</div>
				<div className={ 'ee-calendar-page-date-day' }>
					{ date.toFormat( 'DD' ) }
				</div>
			</div>
		);
	};

	render() {
		const {
			startDate = null,
			endDate = null,
			size = 'small',
			statusClass = '',
		} = this.props;
		let htmlClass = 'ee-calendar-page-date-wrapper ';
		htmlClass += `ee-calendar-page-date-${ size }`;
		return  (
			<div className={ htmlClass }>
				{ this.getStartDate( startDate, statusClass ) }
				{ this.getDivider( startDate, endDate ) }
				{ this.getEndDate( endDate, statusClass ) }
			</div>
		);
	};
}

export default CalendarPageDate;
