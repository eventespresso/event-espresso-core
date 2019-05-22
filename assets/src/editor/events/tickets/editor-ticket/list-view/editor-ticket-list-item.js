/**
 * External imports
 */
import { Component, useReducer } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditorTicketActionsMenu } from '../actions-menu';

const { MODEL_NAME: TICKET, getBackgroundColorClass } = ticketModel;

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

	render() {
		const {
			ticket,
			allDates,
			eventDateTicketMap,
			onUpdate,
			doRefresh,
		} = this.props;
		if ( ! isModelEntityOfModel( ticket, TICKET ) ) {
			return null;
		}
		const statusClass = this.getTicketStatusClass( ticket );
		const bgClass = getBackgroundColorClass( ticket );
		const qty = ticket.qty === 'INF' || ticket.qty === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			ticket.qty;

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
							eventDateTicketMap={ eventDateTicketMap }
							onUpdate={ onUpdate }
							doRefresh={ doRefresh }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

export default (
	( WrappedComponent ) => ( props ) => {
		const [ , doRefresh ] = useReducer( ( s ) => s + 1, 0 );
		return <WrappedComponent { ...props } doRefresh={ doRefresh } />;
	}
)( EditorTicketListItem );
