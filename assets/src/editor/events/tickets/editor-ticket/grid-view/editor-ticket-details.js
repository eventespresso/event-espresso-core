/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { updateTicket } from '../action-handlers/update-ticket';

const { MODEL_NAME: TICKET } = ticketModel;

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
	 * @param {Ticket} ticket 	JSON object defining the Ticket
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
					onChange={ async ( name ) => {
						return await this.updateName( name, ticket );
					} }
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
					onChange={ async ( desc ) => {
						return await this.updateDescription( desc, ticket );
					} }
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
						onChange={ async ( price ) => {
							return await this.updatePrice( price, ticket );
						} }
						label={ __( 'Ticket Price', 'event_espresso' ) }
						valueFormatter={ ticket.price.formatter.formatMoney }
						formatterSettings={ ticket.price.formatter.settings }
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
				value: ticket.qty || Infinity,
				editable: {
					type: 'text',
					valueType: 'number',
					onChange: async ( qty ) => {
						return await this.updateQuantity( qty, ticket );
					},
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
	 * @param {Ticket} ticket
	 * @return {boolean} true if saved
	 */
	updateName = async ( name, ticket ) => {
		if (
			isModelEntityOfModel( ticket, TICKET ) &&
			ticket.name !== name
		) {
			ticket.name = name;
			return updateTicket( ticket );
		}
	};

	/**
	 * @function
	 * @param {string} description new description for ticket
	 * @param {Ticket} ticket
	 * @return {boolean} true if saved
	 */
	updateDescription = async ( description, ticket ) => {
		if (
			isModelEntityOfModel( ticket, TICKET ) &&
			ticket.description !== description
		) {
			ticket.description = description;
			return updateTicket( ticket );
		}
	};

	/**
	 * @function
	 * @param {number} price new price for ticket
	 * @param {Ticket} ticket
	 * @return {boolean} true if saved
	 */
	updatePrice = async ( price, ticket ) => {
		if (
			isModelEntityOfModel( ticket, TICKET ) &&
			ticket.price !== price
		) {
			ticket.price = new Money( price, SiteCurrency );
			return updateTicket( ticket );
		}
	};

	/**
	 * @function
	 * @param {number} qty new number of available tickets
	 * @param {Ticket} ticket
	 * @return {boolean} true if saved
	 */
	updateQuantity = async ( qty, ticket ) => {
		qty = parseInt( qty );
		if (
			isModelEntityOfModel( ticket, TICKET ) &&
			ticket.qty !== qty
		) {
			ticket.qty = qty;
			return updateTicket( ticket );
		}
	};

	render() {
		const ticket = this.state.ticket;
		const { showDesc = 'excerpt', showPrice = true } = this.props;
		return isModelEntityOfModel( ticket, TICKET ) ? (
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
