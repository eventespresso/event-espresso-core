/**
 * External imports
 */
// import moment from 'moment-timezone';
import { Component, Fragment } from 'react';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	MediumCalendarDate,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { ticketModel } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { EditorTicketDetails } from './';
import { EditorTicketActionsMenu } from '../actions-menu';

const { status, TICKET_STATUS_ID } = ticketModel;

/**
 * EditorTicketGridItem
 *
 * @function
 * @param {Object} ticket    JSON object defining the Event Ticket
 * @return {string}        The ticket rendered as a block
 */
class EditorTicketGridItem extends Component {
	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketStatus = ( ticket ) => {
		let ticketStatus = null;
		switch ( status( ticket ) ) {
			case TICKET_STATUS_ID.SOLD_OUT :
				ticketStatus = __( 'SOLD OUT', 'event_espresso' );
				break;
			case TICKET_STATUS_ID.EXPIRED :
				ticketStatus = __( 'EXPIRED', 'event_espresso' );
				break;
			case TICKET_STATUS_ID.PENDING :
				ticketStatus = __( 'PENDING', 'event_espresso' );
				break;
			case TICKET_STATUS_ID.ONSALE :
				ticketStatus = __( 'ON SALE', 'event_espresso' );
				break;
			case TICKET_STATUS_ID.ARCHIVED :
				ticketStatus = __( 'ARCHIVED', 'event_espresso' );
				break;
		}
		return <span key={ 1 }>{ ticketStatus }</span>;
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} ticket status
	 */
	getTicketStatusClass = ( ticket ) => {
		switch ( status( ticket ) ) {
			case TICKET_STATUS_ID.SOLD_OUT :
				return 'ee-ticket-status-sold-out';
			case TICKET_STATUS_ID.EXPIRED :
				return 'ee-ticket-status-expired';
			case TICKET_STATUS_ID.PENDING :
				return 'ee-ticket-status-pending';
			case TICKET_STATUS_ID.ONSALE :
				return 'ee-ticket-status-on-sale';
			case TICKET_STATUS_ID.ARCHIVED :
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
		switch ( ticketModel.status( ticket ) ) {
			case TICKET_STATUS_ID.ONSALE :
				return 'ee-green-background';
			case TICKET_STATUS_ID.EXPIRED :
				return 'ee-lt-grey-background';
			case TICKET_STATUS_ID.SOLD_OUT :
				return 'ee-orange-background';
			case TICKET_STATUS_ID.PENDING :
				return 'ee-blue-background';
			case TICKET_STATUS_ID.ARCHIVED :
				return 'ee-violet-background';
		}
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} showDate
	 * @return {Object} rendered ticket
	 */
	displayTicket = ( ticket, showDate ) => {
		let sidebarColorClass = 'ee-editor-ticket-calendar-sidebar ';
		sidebarColorClass += this.getBgColorClass( ticket );
		// const startDate = moment( ticket.startDate );
		const start = ticket.startDate.toFormat( 'h:mm a' );
		// const endDate = moment( ticket.endDate );
		const end = ticket.endDate.toFormat( 'h:mm a' );

		let label = '';
		if ( showDate === 'start' ) {
			label = __( 'Sale Started', 'event_espresso' );
			if ( ticket.status === 'TKE' ) {
				label = __( 'Sale Ended', 'event_espresso' );
			} else if ( ticket.status === 'TKP' ) {
				label = __( 'Goes On Sale', 'event_espresso' );
			}
		} else if ( showDate === 'end' ) {
			label = __( 'Sale Ends', 'event_espresso' );
			if ( ticket.status === 'TKE' ) {
				label = __( 'Sale Ended', 'event_espresso' );
			}
		}
		const status = this.getTicketStatus( ticket );

		switch ( showDate ) {
			case 'end' :
				return <BiggieCalendarDate
					date={ ticket.endDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ end, status ] }
					position="right"
				/>;
			case 'both' :
				return (
					<div className={
						`${ sidebarColorClass } medium-calendar-date-wrapper  mcd-pos-right`
					} >
						<MediumCalendarDate
							date={ ticket.startDate }
							footerText={ start }
							position="right"
						/>
						<MediumCalendarDate
							date={ ticket.endDate }
							headerText={ __( 'to', 'event_espresso' ) }
							footerText={ [ end, status ] }
							position="right"
						/>
					</div>
				);
			case 'start' :
			default :
				return <BiggieCalendarDate
					date={ ticket.startDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ start, status ] }
					position="right"
				/>;
		}
	};

	render() {
		// console.log( '' );
		// console.log( 'EditorTicketGridItem.render() props: ', this.props );
		const {
			ticket,
			allDates,
			onUpdate,
			displayTicketDate = 'start',
		} = this.props;
		return (
			<Fragment>
				<div className="ee-editor-ticket-main">
					<EditorTicketDetails ticket={ ticket } />
					{ this.displayTicket( ticket, displayTicketDate ) }
				</div>
				<EditorTicketActionsMenu
					ticket={ ticket }
					allDates={ allDates }
					onUpdate={ onUpdate }
				/>
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorTicketGridItem );
