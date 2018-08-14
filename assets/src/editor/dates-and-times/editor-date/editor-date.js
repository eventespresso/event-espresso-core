/**
 * External imports
 */
import { Component } from 'react';
import { CalendarPageDateDisplay } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { EditorDateDetails } from './editor-date-details';
import { EditorDateSidebar } from './editor-date-sidebar';

/**
 * EditorDate
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 * @return {string}        The date rendered as a block
 */
export class EditorDate extends Component {
	/**
	 * getStatusClass
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the Date status
	 */
	getStatusClass = ( eventDate ) => {
		switch ( eventDate.status ) {
			case 'DTA' :
				return 'ee-datetime-active';
			case 'DTE' :
				return 'ee-datetime-expired';
			case 'DTS' :
				return 'ee-datetime-sold-out';
			case 'DTU' :
				return 'ee-datetime-upcoming';
		}
	};

	/**
	 * getBgColorClass
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the background color for the container
	 */
	getBgColorClass = ( eventDate ) => {
		switch ( eventDate.status ) {
			case 'DTA' :
				return 'ee-green-background';
			case 'DTE' :
				return 'ee-lt-grey-background';
			case 'DTS' :
				return 'ee-orange-background';
			case 'DTU' :
				return 'ee-blue-background';
		}
	};

	render() {
		const { eventDate } = this.props;
		// console.log( '' );
		// console.log( 'editorDate() eventDate: ', eventDate );
		const statusClass = this.getStatusClass( eventDate );
		const bgColorClass = this.getBgColorClass( eventDate );
		const startDate = new Date( eventDate.start );
		const endDate = new Date( eventDate.end );
		return (
			<div id={ `ee-editor-date-div-${ eventDate.id }` } className={ `ee-editor-date-div ${ statusClass }` }>
				<div className={ `ee-editor-date-outer-div ${ bgColorClass }` }>
					<div className={ 'ee-editor-date-inner-div' }>
						<EditorDateSidebar eventDate={ eventDate } />
						<CalendarPageDateDisplay startDate={ startDate } endDate={ endDate } />
						<EditorDateDetails eventDate={ eventDate } />
						<div className={ 'clear-float' }></div>
					</div>
				</div>
			</div>
		);
	}
}
