/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { DateTime } from '@eventespresso/value-objects';
import { dateTimeModel } from '@eventespresso/model';

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
 * @param {DateTime} startDate 	Date object for defining the start of an Event Date
 * @param {DateTime} endDate    Date object for defining the end of an Event Date
 * @return {string}         The date rendered to look like a calendar page
 */
class CalendarPageDate extends Component {
	/**
	 * StartDate
	 *
	 * @function
	 * @param {DateTime} startDate object
	 * @return {string} The start date formatted to look like a calendar page
	 */
	getStartDate = ( startDate ) => {
		return (
			<div className="ee-calendar-page-date-wrapper-start" >
				{ this.renderCalendarPage( startDate ) }
			</div>
		);
	};

	/**
	 * EndDate
	 *
	 * @function
	 * @param {DateTime} endDate object
	 * @return {string} The end date formatted to look like a calendar page
	 */
	getEndDate = ( endDate ) => {
		return (
			<div className="ee-calendar-page-date-wrapper-end" >
				{ this.getDivider() }
				{ this.renderCalendarPage( endDate, 'end' ) }
			</div>
		);
	};

	/**
	 * getDivider
	 *
	 * @function
	 * @return {string} a separator between the start and end date
	 */
	getDivider = () => {
		return (
			<div className="ee-calendar-page-date-to">
				{ __( 'TO', 'event_espresso' ) }
			</div>
		);
	};

	/**
	 * renderCalendarPage
	 *
	 * @function
	 * @param {DateTime} eventDate object
	 * @param {string} startOrEnd whether date is a start date or end date
	 * @return {string} The day formatted to look like a calendar page
	 */
	renderCalendarPage = ( eventDate, startOrEnd = 'start' ) => {
		let htmlClass = this.getBgColorClass( eventDate );
		htmlClass = `ee-calendar-page-date-month ${ htmlClass }`;
		return (
			<div className={
				'ee-calendar-page-date-' +
				startOrEnd +
				' ee-calendar-page-date-page'
			}>
				<div className={ htmlClass }>
					{ this.getMonth( eventDate ) }
				</div>
				<div className={ 'ee-calendar-page-date-day' }>
					{ this.getDay( eventDate ) }
				</div>
			</div>
		);
	};

	/**
	 * getBgColorClass
	 *
	 * @function
	 * @param {DateTime} date
	 * @return {string}  CSS class for the container background color
	 */
	getBgColorClass = ( date ) => {
		switch ( dateTimeModel.status( date ) ) {
			case 'DTA' :
				return 'ee-green-background';
			case 'DTE' :
				return 'ee-lt-grey-background';
			case 'DTS' :
				return 'ee-orange-background';
			case 'DTU' :
			default:
				return 'ee-blue-background';
		}
	};

	/**
	 * getMonth
	 *
	 * @function
	 * @param {DateTime} eventDate Date object
	 * @return {string}  The month formatted like 'Jan', 'Feb', 'Mar', etc
	 */
	getMonth = ( eventDate ) => {
		return eventDate.toFormat( 'MMM' );
	};

	/**
	 * getDay
	 *
	 * @function
	 * @param {DateTime} eventDate Date object
	 * @return {string}  The day formatted like 01, 02, 03, etc
	 */
	getDay = ( eventDate ) => {
		return eventDate.toFormat( 'DD' );
	};

	render() {
		const { startDate, endDate } = this.props;
		return startDate instanceof DateTime &&
			endDate instanceof DateTime && (
			<div className={ 'ee-calendar-page-date-wrapper' }>
				{ this.getStartDate( startDate ) }
				{ this.getEndDate( endDate ) }
			</div>
		);
	};
}

export default CalendarPageDate;
