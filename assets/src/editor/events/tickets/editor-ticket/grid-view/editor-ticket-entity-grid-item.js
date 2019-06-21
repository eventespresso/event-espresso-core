/**
 * External imports
 */
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
import EditorTicketEntityDetails from './editor-ticket-entity-details';
import EditorTicketActionsMenu
	from '../actions-menu/editor-ticket-actions-menu';

const {
	getBackgroundColorClass,
	getTicketStatusTextLabel,
	status,
	TICKET_STATUS_ID,
} = ticketModel;

/**
 * EditorTicketEntityGridItem
 *
 * @function
 * @param {Object} ticket    JSON object defining the Event Ticket
 * @return {string}        The ticket rendered as a block
 */
class EditorTicketEntityGridItem extends Component {
	/**
	 * @function
	 * @param {Object} ticketEntity
	 * @param {string} showDate
	 * @return {Object} rendered ticket
	 */
	displayTicket = ( ticketEntity, showDate ) => {
		let sidebarColorClass = 'ee-editor-ticket-calendar-sidebar ';
		sidebarColorClass += getBackgroundColorClass( ticketEntity );
		const ticketStatusID = status( ticketEntity );
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
			<span key={ ticketEntity.id + '-status' } className={ 'ee-status-tag' }>
				{ getTicketStatusTextLabel( ticketEntity ) }
			</span>
		);

		switch ( showDate ) {
			case 'end' :
				const end = ticketEntity.endDate.toFormat( 'h:mm a' );
				return <BiggieCalendarDate
					key={ ticketEntity.id + '-end' }
					date={ ticketEntity.endDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ end, ticketStatus ] }
					position="right"
				/>;
			case 'both' :
				return (
					<CalendarDateRange
						key={ ticketEntity.id + '-both' }
						startDate={ ticketEntity.startDate }
						endDate={ ticketEntity.endDate }
						htmlClass={ sidebarColorClass }
						headerText={ __( 'Sale Date', 'event_espresso' ) }
						footerText={ ticketStatus }
						position="right"
					/>
				);
			case 'start' :
			default :
				const start = ticketEntity.startDate.toFormat( 'h:mm a' );
				return <BiggieCalendarDate
					key={ ticketEntity.id + '-start' }
					date={ ticketEntity.startDate }
					htmlClass={ sidebarColorClass }
					headerText={ label }
					footerText={ [ start, ticketStatus ] }
					position="right"
				/>;
		}
	};

	render() {
		const {
			ticketEntity,
			displayTicketDate = 'start',
			doRefresh,
			refreshed,
		} = this.props;
		if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			return null;
		}
		const dateStyleClass = displayTicketDate === 'both' ?
			'ee-editor-date-range' :
			'ee-editor-date-single';
		return (
			<Fragment>
				<div className={ `ee-editor-ticket-main ${ dateStyleClass }` }>
					<EditorTicketEntityDetails
						key={ ticketEntity.id + '-details' }
						ticketEntity={ ticketEntity }
						refreshed={ refreshed }
					/>
					{ this.displayTicket( ticketEntity, displayTicketDate ) }
				</div>
				<EditorTicketActionsMenu
					key={ ticketEntity.id + '-menu' }
					ticketEntity={ ticketEntity }
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
] )( EditorTicketEntityGridItem );
