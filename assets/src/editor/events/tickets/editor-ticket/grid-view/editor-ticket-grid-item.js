/**
 * External imports
 */
// import moment from 'moment-timezone';
import { Component, Fragment, useReducer } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { compose } from '@wordpress/compose';
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
import EditorTicketActionsMenu from '../actions-menu/editor-ticket-actions-menu';

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
				const end = ticket.endDate.toFormat( 'h:mm a' );
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
				const start = ticket.startDate.toFormat( 'h:mm a' );
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
		const {
			ticket,
			allDates,
			eventDateTicketMap,
			displayTicketDate = 'start',
			doRefresh,
			refreshed,
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
					<EditorTicketDetails
						ticket={ ticket }
						refreshed={ refreshed }
					/>
					{ this.displayTicket( ticket, displayTicketDate ) }
				</div>
				<EditorTicketActionsMenu
					ticket={ ticket }
					allDates={ allDates }
					eventDateTicketMap={ eventDateTicketMap }
					doRefresh={ doRefresh }
				/>
			</Fragment>
		);
	}
}

export default compose( [
	( WrappedComponent ) => ( props ) => {
		const [ refreshed, doRefresh ] = useReducer( ( s ) => s + 1, 0 );
		return <WrappedComponent
			{ ...props }
			doRefresh={ doRefresh }
			refreshed={ refreshed }
		/>;
	},
	withEntityPaperFrame,
] )( EditorTicketGridItem );
