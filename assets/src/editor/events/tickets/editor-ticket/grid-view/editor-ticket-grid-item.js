/**
 * External imports
 */
import moment from 'moment-timezone';
import { Component, Fragment } from 'react';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	MediumCalendarDate,
	withEntityPaperFrame,
} from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { EditorTicketDetails } from './';
import { ActionsMenu } from '../actions-menu';

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
		let status = null;
		switch ( ticket.status ) {
			case 'TKS' :
				status = __( 'SOLD OUT', 'event_espresso' );
				break;
			case 'TKE' :
				status = __( 'EXPIRED', 'event_espresso' );
				break;
			case 'TKP' :
				status = __( 'PENDING', 'event_espresso' );
				break;
			case 'TKO' :
				status = __( 'ON SALE', 'event_espresso' );
				break;
			case 'TKA' :
				status = __( 'ARCHIVED', 'event_espresso' );
				break;
		}
		return <span key={ 1 }>{ status }</span>;
	};

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
	 * @return {string}    CSS class corresponding to the background color for the container
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

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} showDate
	 * @return {Object} rendered ticket
	 */
	displayTicket = ( ticket, showDate ) => {
		let sidebarColorClass = 'ee-editor-ticket-calendar-sidebar ';
		sidebarColorClass += this.getBgColorClass( ticket );
		const startDate = moment( ticket.startDate );
		const start = startDate.format( 'h:mm a' );
		const endDate = moment( ticket.endDate );
		const end = endDate.format( 'h:mm a' );

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
					date={ endDate }
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
							date={ startDate }
							footerText={ start }
							position="right"
						/>
						<MediumCalendarDate
							date={ endDate }
							headerText={ __( 'to', 'event_espresso' ) }
							footerText={ [ end, status ] }
							position="right"
						/>
					</div>
				);
			case 'start' :
			default :
				return <BiggieCalendarDate
					date={ startDate }
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
				<ActionsMenu
					ticket={ ticket }
					allDates={ allDates }
					onUpdate={ onUpdate }
				/>
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorTicketGridItem );
