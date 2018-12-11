/**
 * External imports
 */
import moment from 'moment';
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { EditorDateSidebar } from '../sidebar/editor-date-sidebar';
// import { EditorTicketListModal } from '../../../tickets/editor-ticket/editor-tickets-list';

/**
 * EditorDateListItem
 * Displays comEvent Date as a table row similar to existing event editor UI
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 * @return {string}        The date rendered as a block
 */
export class EditorDateListItem extends Component {
	constructor( props ) {
		super( props );
		this.state = { editorOpen: false };
	}

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

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleEditor = ( event ) => {
		if ( event.target ) {
			// console.log( ' $$$$ ' );
			// console.log(
			// 	'EditorDateGridBlock.toggleEditor() event.target',
			// 	event.target
			// );
			if ( event.target.textContent ) {
				// console.log(
				// 	'EditorDateGridBlock.toggleEditor() textContent',
				// 	event.target.textContent
				// );
				// console.log(
				// 	'EditorDateGridBlock.toggleEditor() this.buttonLabel',
				// 	this.buttonLabel
				// );
				if ( event.target.textContent !== this.buttonLabel ) {
					// console.log( 'EditorDateGridBlock.toggleEditor() DO NOT CLOSE' );
					return;
				}
			}
		}
		// console.log( 'EditorDateGridBlock.toggleEditor() ID: ', this.id );
		this.setState( prevState => ( {
			editorOpen: ! prevState.editorOpen,
		} ) );
	};

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    link to registrations list table for datetime
	 */
	getDatetimeRegistrationsLink = ( eventDate ) => {
		return (
			<a
				href={ eventDate.reg_list_url }
				aria-label={ __(
					'View registrations for this datetime.',
					'event_espresso'
				) }
				className={ 'ee-editor-date-details-reg-url-link' }
				target={ '_blank' }
				rel={ 'noopener norefferer' }
			>
				<span className="dashicons dashicons-groups clickable"></span>
			</a>
		);
	};

	// viewEventDateTickets = ( event, data ) => {
	// 	event.preventDefault();
	// 	console.log( ' >>> CLICK <<< VIEW EVENT DATE TICKETS data.eventDate',
	// 		data.eventDate
	// 	);
	// 	this.toggleEditor();
	// };

	render() {
		const { eventDate } = this.props;
		this.id = `event-date-ticket-list-modal-${ eventDate.id }`;
		// console.log( '' );
		// console.log( 'editorDate() props: ', this.props );
		const statusClass = this.getStatusClass( eventDate );
		const bgClass = this.getBgColorClass( eventDate );
		const buttonLabel = __(
			'Close Event Date Ticket List ',
			'event_espresso'
		) + eventDate.id;
		this.buttonLabel = buttonLabel;
		const regLimit = eventDate.regLimit === 'INF' ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			eventDate.regLimit;
		const regLink = this.getDatetimeRegistrationsLink( eventDate );
		const startDate = moment( new Date( eventDate.start ) );
		const endDate = moment( new Date( eventDate.end ) );

		return (
			<div id={ `ee-editor-date-list-view-div-${ eventDate.id }` }
				className={ `ee-editor-date-list-view-div ${ statusClass }` }
			>
				<div className="ee-editor-date-list-items">
					<div className={ `${ bgClass } ee-date-list-item` }>
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'ID:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.id }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Start Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ startDate.format( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'End Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ endDate.format( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Sold:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.sold }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Reserved:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.reserved }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Capacity:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ regLimit }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Registrants:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ regLink }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Actions:', 'event_espresso' ) }
						</span>
						<EditorDateSidebar
							eventDate={ eventDate }
							viewTicketsHandler={ this.toggleEditor }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

/*
{
	this.state.editorOpen &&
	<EditorTicketListModal
		tickets={ eventDate.tickets }
		id={ `event-date-ticket-list-modal-${ eventDate.id }` }
		for={ `event-date-${ eventDate.id }` }
		editorOpen={ this.state.editorOpen }
		onEditorClose={ this.toggleEditor }
		buttonLabel={ buttonLabel }
		// changesSaved={ this.changesSaved }
	/>
}
<CalendarPageDateDisplay
	startDate={ startDate }
	endDate={ endDate }
/>
*/
