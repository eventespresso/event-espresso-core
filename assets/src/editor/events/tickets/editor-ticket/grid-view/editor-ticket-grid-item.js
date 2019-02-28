/**
 * External imports
 */
// import moment from 'moment-timezone';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	CalendarDateRange,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditorTicketDetails } from './';
import { EditorTicketActionsMenu } from '../actions-menu';

const {
	getBackgroundColorClass,
	getTicketStatusTextLabel,
	status,
	TICKET_STATUS_ID,
} = ticketModel;

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
	 * @param {string} showDate
	 * @return {Object} rendered ticket
	 */
	displayTicket = ( ticket, showDate ) => {
		let sidebarColorClass = 'ee-editor-ticket-calendar-sidebar ';
		sidebarColorClass += getBackgroundColorClass( ticket );
		// const startDate = moment( ticket.startDate );
		const start = ticket.startDate.toFormat( 'h:mm a' );
		// const endDate = moment( ticket.endDate );
		const end = ticket.endDate.toFormat( 'h:mm a' );
		const ticketStatusID = status( ticket );
		let label = '';
		if ( showDate === 'start' ) {
			label = __( 'Sale Started', 'event_espresso' );
			if ( ticketStatusID === TICKET_STATUS_ID.EXPIRED ) {
				label = __( 'Sale Ended', 'event_espresso' );
			} else if ( ticketStatusID === TICKET_STATUS_ID.PENDING ) {
				label = __( 'Goes On Sale', 'event_espresso' );
			}
		} else if ( showDate === 'end' ) {
			label = __( 'Sale Ends', 'event_espresso' );
			if ( ticketStatusID === TICKET_STATUS_ID.EXPIRED ) {
				label = __( 'Sale Ended', 'event_espresso' );
			}
		}
		const ticketStatus = (
			<span key={ 1 }>{ getTicketStatusTextLabel( ticket ) }</span>
		);

		switch ( showDate ) {
			case 'end' :
				return <BiggieCalendarDate
					date={ ticket.endDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ end, ticketStatus ] }
					position="right"
				/>;
			case 'both' :
				return (
					<CalendarDateRange
						startDate={ ticket.startDate }
						endDate={ ticket.endDate }
						htmlClass={ sidebarColorClass }
						footerText={ <strong>{ ticketStatus }</strong> }
						position="right"
					/>
				);
			case 'start' :
			default :
				return <BiggieCalendarDate
					date={ ticket.startDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ start, ticketStatus ] }
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
			eventDateTicketMap,
			onUpdate,
			displayTicketDate = 'start',
		} = this.props;
		if ( ! isModelEntityOfModel( ticket, ticketModel.MODEL_NAME ) ) {
			return null;
		}
		const dateStyleClass = displayTicketDate === 'both' ?
			'ee-editor-date-range' :
			'ee-editor-date-single';
		return (
			<Fragment>
				<div className={ `ee-editor-ticket-main ${ dateStyleClass }` }>
					<EditorTicketDetails ticket={ ticket } />
					{ this.displayTicket( ticket, displayTicketDate ) }
				</div>
				<EditorTicketActionsMenu
					ticket={ ticket }
					allDates={ allDates }
					eventDateTicketMap={ eventDateTicketMap }
					onUpdate={ onUpdate }
				/>
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorTicketGridItem );
