/**
 * External imports
 */
import { Component, Fragment } from 'react';
import moment from 'moment';
import { find } from 'lodash';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '../../../higher-order-components';
import { IconButton } from '@wordpress/components';
import { BiggieCalendarDate } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { TicketEditorModal } from './ticket-editor';
import './ticket-style.css';

/**
 * EditorTicketList
 *
 * @constructor
 * @param {Array}   tickets
 * @param {Function} onTicketChange callback for editing tickets
 */
export class EditorTicketList extends Component {
	constructor( props ) {
		super( props );
		// console.log( '' );
		// console.log( 'EditorTicketList props: ', props );
		this.state = {
			editorOpen: false,
			changesSaved: true,
			for: props.for ? props.for : 0,
			tickets: props.tickets,
			ticketToEdit: null,
		};
	}

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleEditor = ( event ) => {
		if ( event.target ) {
			// console.log( ' **** ' );
			// console.log(
			// 	'EditorTicketList.toggleEditor() event.target ',
			// 	event.target
			// );
			if ( event.target.textContent && event.target.textContent !== this.buttonLabel ) {
				// console.log( 'EditorTicketList.toggleEditor() DO NOT CLOSE' );
				return;
			}
		}
		this.setState( prevState => {
			// if ( prevState.editorOpen && ! prevState.changesSaved ) {
			// 	return ( {
			// 		editorOpen: ! window.confirm(
			// 			__(
			// 				'Are you sure you want to close the ' +
			// 				'\nEvent Date Ticket Editor? ' +
			// 				'\n\nAll unsaved changes will be lost!',
			// 				'event_espresso'
			// 			)
			// 		),
			// 	} );
			// }
			// console.log( '*** toggleEditor ***', prevState.ticketToEdit );
			return ( {
				editorOpen: ! prevState.editorOpen,
				ticketToEdit: ! prevState.editorOpen ?
					prevState.ticketToEdit :
					null,
			} );
		} );
	};

	/**
	 * @function
	 * @param {boolean} changesSaved
	 */
	changesSaved = ( changesSaved = false ) => {
		// console.log( '*** changesSaved ***', changesSaved );
		this.setState( { changesSaved: changesSaved } );
	};

	/**
	 * @function
	 * @param {Array} tickets
	 * @return {Array} array of GeneratedDatetimeRow list items
	 */
	generateTickets = ( tickets ) => {
		return tickets.map(
			( ticket, index ) => {
				const statusClass = this.getTicketStatusClass( ticket );
				return (
					<li key={ index }>
						<div className="ee-ticket-wrapper ee-curled-paper-shadow">
							<div className={ `ee-ticket ${ statusClass }` }>
								<div className="ee-ticket-details">
									<div className="ee-ticket-id">
										<span className="ee-ticket-id-label">
											{ __( 'Ticket ID: ', 'event_espresso' ) }
										</span>
										<span className="ee-ticket-id-span">
											{ ticket.id }
										</span>
									</div>
									<h1 className="ee-ticket-name">
										{ ticket.name }
									</h1>
									<h2 className="ee-ticket-price">
										${ ticket.price }
									</h2>
									<div className="ee-ticket-desc">
										{ ticket.description }
									</div>
									{ this.getTicketFooter( ticket ) }
								</div>
								<div className="ee-ticket-edit">
									<IconButton
										className="ee-ticket-edit-btn"
										tooltip={ __( 'click to edit',
											'event_espresso'
										) }
										label={ __( 'click to edit',
											'event_espresso'
										) }
										icon="admin-generic"
										onClick={ this.editTicket }
										value={ ticket.id }
									/>
								</div>
								{ this.getTicketSidebar( ticket ) }
							</div>
						</div>
					</li>
				);
			}
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketStatus = ( ticket ) => {
		switch ( ticket.status ) {
			case 'TKS' :
				return __( 'SOLD OUT', 'event_espresso' );
			case 'TKE' :
				return __( 'EXPIRED', 'event_espresso' );
			case 'TKP' :
				return __( 'PENDING', 'event_espresso' );
			case 'TKO' :
				return __( 'ON SALE', 'event_espresso' );
			case 'TKA' :
				return __( 'ARCHIVED', 'event_espresso' );
		}
	};

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
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketSidebar = ( ticket ) => {
		const status = this.getTicketStatus( ticket );
		let date = moment( new Date( ticket.startDate ) );
		let label = __( 'Sale Started', 'event_espresso' );
		if ( ticket.status === 'TKE' ) {
			date = moment( new Date( ticket.endDate ) );
			label = __( 'Sale Ended', 'event_espresso' );
		} else if ( ticket.status === 'TKP' ) {
			date = moment( new Date( ticket.startDate ) );
			label = __( 'Goes On Sale', 'event_espresso' );
		}

		return (
			<BiggieCalendarDate
				date={ date }
				htmlClass="ee-ticket-sidebar"
				headerText={ label }
				footerText={ status }
				position="right"
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketFooter = ( ticket ) => {
		return (
			<div className="ee-ticket-details-footer">
				<div className="ee-ticket-details-sold-rsrvd-qty-div">
					<div className="ee-ticket-details-sold-div">
						<div className="ee-ticket-details-sold-label">
							{ __( 'sold', 'event_espresso' ) }
						</div>
						<div className="ee-ticket-details-sold-value">
							{ ticket.sold }
						</div>
					</div>
					<div className="ee-ticket-details-sep"></div>
					<div className="ee-ticket-details-reserved-div">
						<div className="ee-ticket-details-reserved-label">
							{ __( 'reserved', 'event_espresso' ) }
						</div>
						<div className="ee-ticket-details-reserved-value">
							{ ticket.reserved }
						</div>
					</div>
					<div className="ee-ticket-details-sep"></div>
					<div className="ee-ticket-details-qty-div">
						<div className="ee-ticket-details-qty-label">
							{ __( 'qty', 'event_espresso' ) }
						</div>
						<div className="ee-ticket-details-qty-value">
							{ ticket.qty }
						</div>
					</div>
					<div className="ee-ticket-details-sep"></div>
					<div className="ee-ticket-details-reg-div">
						<div className="ee-ticket-details-reg-label">
							{ __( 'registrations', 'event_espresso' ) }
						</div>
						<div className="ee-ticket-details-reg-value">
							{ ticket.regCount }
						</div>
					</div>
				</div>
			</div>
		);
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	editTicket = ( event ) => {
		// console.log(
		// 	'>>> CLICK <<< EventDateTicketDetails.editTicket()',
		// 	event.target.value
		// );
		const ticketId = event.target && event.target.value ?
			parseInt( event.target.value ) :
			0;
		// console.log( 'ticketId', ticketId );
		// console.log( 'this.state.ticketToEdit', this.state.ticketToEdit );
		const ticket = find( this.state.tickets, { id: ticketId } );
		// console.log( 'ticket', ticket );
		// this.setState( { ticketToEdit: ticket } );
		this.setState( ( prevState ) => ( {
			editorOpen: ! prevState.editorOpen,
			ticketToEdit: prevState.ticketToEdit === null || (
				prevState.ticketToEdit && prevState.ticketToEdit.id !== ticket.id
			) ?
				ticket :
				null,
		} ) );
	};

	render() {
		let { title } = this.props;
		title = title ? <h1>{ title }</h1> : '';
		const listClass = this.state.ticketToEdit ?
			`event-date-tickets-list-${ this.state.ticketToEdit.id }` :
			'ee-editor-event-tickets-list';
		const modalId = this.state.ticketToEdit ?
			`event-date-ticket-modal-${ this.state.ticketToEdit.id }` :
			null;
		const buttonLabel = this.state.ticketToEdit ?
			__( 'Close Event Date Ticket ', 'event_espresso' ) +
			this.state.ticketToEdit.id :
			'';
		this.buttonLabel = buttonLabel;
		const modal = modalId ? (
			<TicketEditorModal
				id={ modalId }
				ticket={ this.state.ticketToEdit }
				editorOpen={ this.state.editorOpen }
				closeModal={ this.toggleEditor }
				changesSaved={ this.changesSaved }
				buttonLabel={ buttonLabel }
			/>
		) : null;
		return (
			<Fragment>
				{ title }
				<ul className={ listClass }>
					{ this.generateTickets( this.state.tickets ) }
				</ul>
				{ modal }
			</Fragment>
		);
	}
}

/**
 * Enhanced EditorTicketList with Modal
 */
export const EditorTicketListModal = withEditorModal( {
	title: __( 'Available Tickets List', 'event_espresso' ),
	customClass: 'ee-event-date-tickets-list-modal',
	closeButtonLabel: __( 'close event date tickets list', 'event_espresso' ),
} )( EditorTicketList );
