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
import EditorTicketActionsMenu from '../actions-menu/editor-ticket-actions-menu';

const { MODEL_NAME: TICKET, getBackgroundColorClass } = ticketModel;

/**
 * EditorDateGridBlock
 *
 * @function
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {string}        The ticket rendered as a block
 */
class EditorTicketEntityListItem extends Component {
	/**
	 * @function
	 * @param {Object} ticketEntity
	 * @return {string} ticket status
	 */
	getTicketStatusClass = ( ticketEntity ) => {
		switch ( ticketEntity.status ) {
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
			ticketEntity,
			doRefresh,
		} = this.props;
		if ( ! isModelEntityOfModel( ticketEntity, TICKET ) ) {
			return null;
		}
		const statusClass = this.getTicketStatusClass( ticketEntity );
		const bgClass = getBackgroundColorClass( ticketEntity );
		const qty = ticketEntity.qty === 'INF' || ticketEntity.qty === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			ticketEntity.qty;
		return (
			<div id={ `ee-editor-ticket-list-view-div-${ ticketEntity.id }` }
				className={ `ee-editor-ticket-list-view-div ${ statusClass }` }
			>
				<div className="ee-editor-ticket-list-items">
					<div className={ `${ bgClass } ee-ticket-list-item` }>
						<span className="ee-ticket-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.name }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'ID:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.id }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.name }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Price:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.price.amount.toString() }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Start Date:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{
								ticketEntity.startDate
									.toFormat( 'ddd MMM YY h:mm a' )
							}
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Sold:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.sold }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Reserved:', 'event_espresso' ) }
						</span>
						<span className="ee-ticket-list-item-value">
							{ ticketEntity.reserved }
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
							{ /* should be count of related registrations  */ }
							{ ticketEntity.sold }
						</span>
					</div>
					<div className="ee-ticket-list-item">
						<span className="ee-ticket-list-item-label">
							{ __( 'Actions:', 'event_espresso' ) }
						</span>
						<EditorTicketActionsMenu
							ticketEntity={ ticketEntity }
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
		const refresher = () => {
			doRefresh( {} );
		};
		return <WrappedComponent { ...props } doRefresh={ refresher } />;
	}
)( EditorTicketEntityListItem );
