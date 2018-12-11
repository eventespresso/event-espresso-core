/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { Dashicon } from '@wordpress/components';
import { EntityDetailsPanel } from '@eventespresso/components';

/**
 * EditorTicketDetails
 *
 * @function
 * @param {Object} eventTicket    JSON object defining the Event Ticket
 * @return {string}    ticket details
 */
export class EditorTicketDetails extends Component {
	/**
	 * ticketName
	 *
	 * @function
	 * @param {Object} ticket 	JSON object defining the Ticket
	 * @return {string}     	ticket name
	 */
	ticketName = ( ticket ) => {
		const htmlClass = ticket.name && ticket.name.length > 40 ?
			'ee-editor-ticket-name-heading ee-long-title' :
			'ee-editor-ticket-name-heading';
		return ticket.name ?
			<h1 className={ htmlClass }>{ ticket.name }</h1> : '';
	};

	/**
	 * description
	 *
	 * @function
	 * @param {Object} ticket JSON object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} ticket description
	 */
	description = ( ticket, showDesc ) => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-ticket-desc-div ee-ticket-desc-excerpt' :
			'ee-editor-ticket-desc-div';
		return (
			<div className={ htmlClass }>
				{ ticket.description }
			</div>
		);
	};

	/**
	 * ticketPrice
	 *
	 * @function
	 * @param {Object} ticket JSON object defining the Event Date
	 * @param {boolean} showPrice
	 * @return {string}    ticket price
	 */
	ticketPrice = ( ticket, showPrice ) => {
		return showPrice ?
			(
				<h2 className="ee-ticket-price">
					${ ticket.price }
				</h2>
			) :
			'';
	};

	/**
	 * ticketSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} ticket    JSON object defining the Event Date
	 * @return {string}    ticket details
	 */
	ticketSoldReservedCapacity = ( ticket ) => {
		const details = [
			{
				id: 'ticket-sold',
				label: __( 'sold', 'event_espresso' ),
				value: ticket.sold,
			},
			{
				id: 'ticket-reserved',
				label: __( 'reserved', 'event_espresso' ),
				value: ticket.reserved,
			},
			{
				id: 'ticket-qty',
				label: __( 'quantity', 'event_espresso' ),
				value: ticket.qty,
			},
			{
				id: 'ticket-registrants',
				label: __( 'registrants', 'event_espresso' ),
				value: ticket.regCount,
			},
		];
		return <EntityDetailsPanel
			details={ details }
			htmlClass="ee-editor-ticket-details-sold-rsrvd-qty-div"
		/>;
	};

	/**
	 * ticketSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} ticket    JSON object defining the Event Date
	 * @return {string}    link to registrations list table for ticket
	 */
	getTicketRegistrationsLink = ( ticket ) => {
		return ticket.reg_list_url && (
			<a
				href={ ticket.reg_list_url }
				title={ __( 'View registrations for this ticket.', 'event_espresso' ) }
				className={ 'ee-editor-ticket-details-reg-url-link' }
				target={ '_blank' }
				rel={ 'noopener norefferer' }
			>
				<Dashicon icon="groups" className="clickable" />
			</a>
		);
	};

	render() {
		const { ticket, showDesc = 'excerpt', showPrice = true } = this.props;
		return (
			<div className={ 'ee-editor-ticket-details-wrapper-div' }>
				{ this.ticketName( ticket ) }
				{ this.ticketPrice( ticket, showPrice ) }
				{ this.description( ticket, showDesc ) }
				{ this.ticketSoldReservedCapacity( ticket ) }
			</div>
		);
	}
}
