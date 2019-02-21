/**
 * External imports
 */
// import moment from 'moment-timezone';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditorTicketActionsMenu } from '../actions-menu';

/**
 * EditorDateGridBlock
 *
 * @function
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {string}        The ticket rendered as a block
 */
class EditorTicketListItem extends Component {
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
	 * @return {string}    CSS class corresponding to the background color for
	 *   the container
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

	render() {
		const {
			ticket,
			allDates,
			onUpdate,
		} = this.props;
		if ( ! isModelEntityOfModel( ticket, ticketModel.MODEL_NAME ) ) {
			return null;
		}
		console.log( '' );
		console.log( 'EditorTicketListItem.render()' );
		console.log( ' > props: ', this.props );
		const statusClass = this.getTicketStatusClass( ticket );
		const bgClass = this.getBgColorClass( ticket );
		const qty = ticket.qty === 'INF' || ticket.qty === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			ticket.qty;
		// const startDate = moment( new Date( ticket.start ) );
		// const endDate = moment( new Date( ticket.end ) );

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
							{ ticket.startDate.toFormat( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'End Date:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticket.endDate.toFormat( 'ddd MMM YY h:mm a' ) }
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
						<EditorTicketActionsMenu
							ticket={ ticket }
							allDates={ allDates }
							onUpdate={ onUpdate }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

export default EditorTicketListItem;
