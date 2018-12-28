/**
 * External imports
 */
import moment from 'moment-timezone';
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
// import { EditorDateSidebar } from '../sidebar/editor-date-sidebar';
// import { EditorTicketListModal } from '../../../tickets/editor-ticket/editor-tickets-list';

/**
 * EditorDateGridBlock
 *
 * @function
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {string}        The ticket rendered as a block
 */
export class EditorTicketListItem extends Component {
	constructor( props ) {
		super( props );
		this.state = { editorOpen: false };
	}

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketStatusClass = ( ticket ) => {
		switch ( ticket.status ) {
			case 'TKS' :
				return 'ee-ticket-status-sold-out';
			case 'TKE' :
				return 'ee-ticket-status-expired';
			case 'TKP' :
				return 'ee-ticket-status-pending';
			case 'TKO' :
				return 'ee-ticket-status-on-sale';
			case 'TKA' :
				return 'ee-ticket-status-archived';
		}
	};

	/**
	 * getBgColorClass
	 *
	 * @function
	 * @param {Object} ticket    JSON object defining the Event Ticket
	 * @return {string}    CSS class corresponding to the background color for the container
	 */
	getBgColorClass = ( ticket ) => {
		switch ( ticket.status ) {
			case 'TKO' :
				return 'ee-green-background';
			case 'TKE' :
				return 'ee-lt-grey-background';
			case 'TKS' :
				return 'ee-orange-background';
			case 'TKP' :
				return 'ee-blue-background';
			case 'TKA' :
				return 'ee-violet-background';
		}
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	// toggleEditor = ( event ) => {
	// 	if ( event.target ) {
	// 		// console.log( ' $$$$ ' );
	// 		// console.log(
	// 		// 	'EditorDateGridBlock.toggleEditor() event.target',
	// 		// 	event.target
	// 		// );
	// 		if ( event.target.textContent ) {
	// 			// console.log(
	// 			// 	'EditorDateGridBlock.toggleEditor() textContent',
	// 			// 	event.target.textContent
	// 			// );
	// 			// console.log(
	// 			// 	'EditorDateGridBlock.toggleEditor() this.buttonLabel',
	// 			// 	this.buttonLabel
	// 			// );
	// 			if ( event.target.textContent !== this.buttonLabel ) {
	// 				// console.log( 'EditorDateGridBlock.toggleEditor() DO NOT CLOSE' );
	// 				return;
	// 			}
	// 		}
	// 	}
	// 	// console.log( 'EditorDateGridBlock.toggleEditor() ID: ', this.id );
	// 	this.setState( prevState => ( {
	// 		editorOpen: ! prevState.editorOpen,
	// 	} ) );
	// };

	/**
	 * @function
	 * @param {Object} ticket    JSON object defining the ticket
	 * @return {string}    link to registrations list table for ticket
	 */
	// getDatetimeRegistrationsLink = ( ticket ) => {
	// 	return (
	// 		<a
	// 			href={ ticket.reg_list_url }
	// 			title={ __( 'View registrations for this datetime.',
	// 				'event_espresso'
	// 			) }
	// 			className={ 'ee-editor-date-details-reg-url-link' }
	// 			target={ '_blank' }
	// 			rel={ 'noopener norefferer' }
	// 		>
	// 			<span className="dashicons dashicons-groups clickable"></span>
	// 		</a>
	// 	);
	// };

	// viewEventDateTickets = ( event, data ) => {
	// 	event.preventDefault();
	// 	console.log( ' >>> CLICK <<< VIEW EVENT DATE TICKETS data.eventDate',
	// 		data.eventDate
	// 	);
	// 	this.toggleEditor();
	// };

	render() {
		const { ticket } = this.props;
		// console.log( '' );
		// console.log( 'editorDate() props: ', this.props );
		const statusClass = this.getTicketStatusClass( ticket );
		const bgClass = this.getBgColorClass( ticket );
		// const buttonLabel = __(
		// 	'Close Event Date Ticket List ',
		// 	'event_espresso'
		// ) + ticket.id;
		// this.buttonLabel = buttonLabel;
		const qty = ticket.qty === 'INF' ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			ticket.qty;
		// const regLink = this.getDatetimeRegistrationsLink( ticket );
		const startDate = moment( new Date( ticket.start ) );
		const endDate = moment( new Date( ticket.end ) );

		return (
			<div id={ `ee-editor-ticket-list-view-div-${ ticket.id }` }
				className={ `ee-editor-ticket-list-view-div ${ statusClass }` }
			>
				<div className="ee-editor-ticket-list-items">
					<div className={ `${ bgClass } ee-ticket-list-item` }>
						<span className="ee-ticket-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.name }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'ID:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.id }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.name }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Start Date:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ startDate.format( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'End Date:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ endDate.format( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Sold:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.sold }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Reserved:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.reserved }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Quantity:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ qty }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Registrants:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.regCount }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Actions:', 'event_espresso' ) }
						</span>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

/*
<EditorDateSidebar
	eventDate={ eventDate }
	viewTicketsHandler={ this.toggleEditor }
/>
{
	this.state.editorOpen &&
	<EditorTicketListModal
		tickets={ eventDate.tickets }
		id={ `event-date-ticket-list-modal-${ eventDate.id }` }
		for={ `event-date-${ eventDate.id }` }
		editorOpen={ this.state.editorOpen }
		closeModal={ this.toggleEditor }
		buttonLabel={ buttonLabel }
		// changesSaved={ this.changesSaved }
	/>
}

<CalendarPageDateDisplay
	startDate={ startDate }
	endDate={ endDate }
/>
*/
