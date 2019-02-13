/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';

/**
 * EditorTicketDetails
 *
 * @function
 * @param {Object} eventTicket    JSON object defining the Event Ticket
 * @return {string}    ticket details
 */
class EditorTicketDetails extends Component {
	constructor( props ) {
		super( props );
		this.state = { ticket: props.ticket ? props.ticket : {} };
	}

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
		return (
			<h1 className={ htmlClass }>
				<InlineEditInput
					htmlId={ `editor-ticket-name-${ ticket.id }` }
					type="text"
					value={ ticket.name }
					onChange={ this.updateName }
					label={ __( 'Ticket Name', 'event_espresso' ) }
				/>
			</h1>
		);
	};

	/**
	 * description
	 *
	 * @function
	 * @param {Object} ticket JSON object defining the ticket
	 * @param {string} showDesc
	 * @return {string} ticket description
	 */
	description = ( ticket, showDesc ) => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-ticket-desc-div ee-ticket-desc-excerpt' :
			'ee-editor-ticket-desc-div';
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `editor-ticket-desc-${ ticket.id }` }
					type="textarea"
					value={ ticket.description }
					onChange={ this.updateDescription }
					label={ __( 'Ticket Description', 'event_espresso' ) }
				/>
			</div>
		);
	};

	/**
	 * ticketPrice
	 *
	 * @function
	 * @param {Object} ticket JSON object defining the ticket
	 * @param {boolean} showPrice
	 * @return {string}    ticket price
	 */
	ticketPrice = ( ticket, showPrice ) => {
		return showPrice ?
			(
				<h2 className="ee-ticket-price">
					<InlineEditInput
						htmlId={ `editor-ticket-price-${ ticket.id }` }
						type="text"
						value={ ticket.price.amount.toNumber() }
						onChange={ this.updatePrice }
						label={ __( 'Ticket Price', 'event_espresso' ) }
						valueFormatter={ ticket.price.formatter.formatMoney }
					/>
				</h2>
			) :
			'';
	};

	/**
	 * ticketSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} ticket    JSON object defining the ticket
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
				editable: {
					type: 'text',
					valueType: 'number',
					onChange: this.updateQuantity,
				},
			},
			{
				id: 'ticket-registrants',
				label: __( 'registrants', 'event_espresso' ),
				value: ticket.sold,
			},
		];
		return <EntityDetailsPanel
			details={ details }
			htmlClass="ee-editor-ticket-details-sold-rsrvd-qty-div"
		/>;
	};

	/**
	 * @function
	 * @param {string} name new name for ticket
	 */
	updateName = ( name ) => {
		console.log( '>>> EditorTicketDetails.updateName()', name );
		this.setState(
			( prevState ) => {
				prevState.ticket.name = name;
				return { ticket: prevState.ticket };
			}
		);
	};

	/**
	 * @function
	 * @param {string} description new description for ticket
	 */
	updateDescription = ( description ) => {
		console.log( '>>> EditorTicketDetails.updateDescription()', description );
		this.setState(
			( prevState ) => {
				prevState.ticket.description = description;
				return { ticket: prevState.ticket };
			}
		);
	};

	/**
	 * @function
	 * @param {number} price new price for ticket
	 */
	updatePrice = ( price ) => {
		console.log( '>>> EditorTicketDetails.updatePrice()', price );
		this.setState(
			( prevState ) => {
				prevState.ticket.price = price;
				return { ticket: prevState.ticket };
			}
		);
	};

	/**
	 * @function
	 * @param {number} qty new number of available tickets
	 */
	updateQuantity = ( qty ) => {
		console.log( '>>> EditorTicketDetails.updateQuantity()', qty );
		this.setState(
			( prevState ) => {
				prevState.ticket.qty = qty;
				return { ticket: prevState.ticket };
			}
		);
	};

	render() {
		const ticket = this.state.ticket;
		const { showDesc = 'excerpt', showPrice = true } = this.props;
		return ticket && ticket.id ? (
			<div className={ 'ee-editor-ticket-details-wrapper-div' }>
				{ this.ticketName( ticket ) }
				{ this.ticketPrice( ticket, showPrice ) }
				{ this.description( ticket, showDesc ) }
				{ this.ticketSoldReservedCapacity( ticket ) }
			</div>
		) : null;
	}
}

export default EditorTicketDetails;
