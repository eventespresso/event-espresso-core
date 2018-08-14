/**
 * External imports
 */
import moment from 'moment';
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * CalendarPageDateDisplay
 * Displays a date as if it were a page from one of those mini calendars were each page is a day
 *
 * @function
 * @param {Date} startDate 	Date object for defining the start of an Event Date
 * @param {Date} endDate    Date object for defining the end of an Event Date
 * @return {string}         The date rendered to look like a calendar page
 */
export class CalendarPageDateDisplay extends Component {

	/**
	 * StartDate
	 *
	 * @function
	 * @param {Date} startDate    Date object
	 * @return {string}        The start date formatted to look like a calendar page
	 */
	getStartDate = ( { startDate } ) => {
		return (
			<div className={ 'ee-calendar-page-date-wrapper-start' }>
				{ this.renderCalendarPage( startDate ) }
			</div>
		);
	};

	/**
	 * EndDate
	 *
	 * @function
	 * @param {Date|null} endDate    Date object
	 * @return {string}            The end date formatted to look like a calendar page
	 */
	getEndDate = ( { endDate = null } ) => {
		return endDate instanceof Date && (
			<div className={ 'ee-calendar-page-date-wrapper-end' }>
				{ this.getDivider() }{ this.renderCalendarPage( endDate, 'end' ) }
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
	 * @param {Date} eventDate            Date object
	 * @param {string} startOrEnd    whether date is a start date or end date
	 * @return {string}            The day formatted to look like a calendar page
	 */
	renderCalendarPage = ( eventDate, startOrEnd = 'start' ) => {
		return (
			<div className={ 'ee-calendar-page-date-' + startOrEnd + ' ee-calendar-page-date-page' }>
				<div className={ 'ee-calendar-page-date-month' }>
					{ this.getMonth( eventDate ) }
				</div>
				<div className={ 'ee-calendar-page-date-day' }>
					{ this.getDay( eventDate ) }
				</div>
			</div>
		);
	};

	/**
	 * getMonth
	 *
	 * @function
	 * @param {Date} eventDate    Date object
	 * @return {string}      The month formatted like 'Jan', 'Feb', 'Mar', etc
	 */
	getMonth = ( eventDate ) => {
		return moment( eventDate ).format( 'MMM' );
	};

	/**
	 * getDay
	 *
	 * @function
	 * @param {Date} eventDate    Date object
	 * @return {string}      The day formatted like 01, 02, 03, etc
	 */
	getDay = ( eventDate ) => {
		return moment( eventDate ).format( 'DD' );
	};

	render() {
		const { startDate, endDate } = this.props;
		return (
			<div className={ 'ee-calendar-page-date-wrapper' }>
				{ this.getStartDate( startDate ) }
				{ this.getEndDate( endDate ) }
			</div>
		);
	};
}

