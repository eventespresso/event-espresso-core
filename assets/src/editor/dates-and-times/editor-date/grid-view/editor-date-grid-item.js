/**
 * External imports
 */
import moment from 'moment';
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
import { EditorDateDetails } from '../editor-date-details';
import { EditorDateSidebar } from '../sidebar/editor-date-sidebar';
// import { EditorTicketListModal } from '../../../tickets/editor-ticket/editor-tickets-list';

/**
 * EditorDateGridItem
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 * @return {string}        The date rendered as a block
 */
class EditorDateGridItem extends Component {
	constructor( props ) {
		super( props );
		this.state = { editorOpen: false };
	}

	/**
	 * getStatusClass
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the Date status
	 */
	getStatusClass = ( eventDate ) => {
		switch ( eventDate.status ) {
			case 'DTA' :
				return 'ee-datetime-active';
			case 'DTE' :
				return 'ee-datetime-expired';
			case 'DTS' :
				return 'ee-datetime-sold-out';
			case 'DTU' :
				return 'ee-datetime-upcoming';
		}
	};

	/**
	 * getBgColorClass
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the background color for the container
	 */
	getBgColorClass = ( eventDate ) => {
		switch ( eventDate.status ) {
			case 'DTA' :
				return 'ee-green-background';
			case 'DTE' :
				return 'ee-lt-grey-background';
			case 'DTS' :
				return 'ee-orange-background';
			case 'DTU' :
				return 'ee-blue-background';
		}
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	toggleEditor = ( event ) => {
		// console.log( ' $$$$ ' );
		if ( event.target ) {
			// console.log(
			// 	'EditorDateGridItem.toggleEditor() event.target',
			// 	event.target
			// );
			if ( event.target.textContent ) {
				// console.log(
				// 	'EditorDateGridItem.toggleEditor() textContent',
				// 	event.target.textContent
				// );
				// console.log(
				// 	'EditorDateGridItem.toggleEditor() this.buttonLabel',
				// 	this.buttonLabel
				// );
				if ( event.target.textContent !== this.buttonLabel ) {
					// console.log( 'EditorDateGridItem.toggleEditor() DO NOT CLOSE' );
					return;
				}
			}
		}
		// console.log(
		// 	'EditorDateGridItem.toggleEditor() editorOpen: ',
		// 	this.state.editorOpen
		// );
		this.setState( prevState => ( {
			editorOpen: ! prevState.editorOpen,
		} ) );
	};

	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {string} showDate
	 * @return {Object} rendered date
	 */
	displayDate = ( eventDate, showDate ) => {
		let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
		sidebarColorClass += this.getBgColorClass( eventDate );
		const startDate = moment( new Date( eventDate.start ) );
		const endDate = moment( new Date( eventDate.end ) );

		switch ( showDate ) {
			case 'end' :
				return <BiggieCalendarDate
					date={ endDate }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'ends', 'event_espresso' ) }
					footerText={ endDate.format( 'h:mm a' ) }
				/>;
			case 'both' :
				return (
					<div className={
						`${ sidebarColorClass } medium-calendar-date-wrapper`
					} >
						<MediumCalendarDate
							date={ startDate }
							footerText={ startDate.format( 'h:mm a' ) }
						/>
						<MediumCalendarDate
							date={ endDate }
							headerText={ __( 'to', 'event_espresso' ) }
							footerText={ endDate.format( 'h:mm a' ) }
						/>
					</div>
				);
			case 'start' :
			default :
				return <BiggieCalendarDate
					date={ startDate }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'starts', 'event_espresso' ) }
					footerText={ startDate.format( 'h:mm a' ) }
				/>;
		}
	};

	// viewEventDateTickets = ( event, data ) => {
	// 	event.preventDefault();
	// 	console.log( ' >>> CLICK <<< VIEW EVENT DATE TICKETS data.eventDate',
	// 		data.eventDate
	// 	);
	// 	this.toggleEditor();
	// };

	render() {
		// console.log( '' );
		// console.log( 'EditorDateGridItem.render() props: ', this.props );
		const {
			eventDate,
			showDate = 'start',
			showDesc = 'excerpt',
			showVenue = true,
		} = this.props;
		// const statusClass = this.getStatusClass( eventDate );
		this.id = `event-date-ticket-list-modal-${ eventDate.id }`;
		const buttonLabel = __(
			'Close Event Date Ticket List ',
			'event_espresso'
		) + eventDate.id;
		this.buttonLabel = buttonLabel;
		return (
			<Fragment>
				<div className="ee-editor-date-main">
					{ this.displayDate( eventDate, showDate ) }
					<EditorDateDetails
						eventDate={ eventDate }
						showDesc={ showDesc }
						showVenue={ showVenue }
					/>
				</div>
				<EditorDateSidebar
					eventDate={ eventDate }
					viewTicketsHandler={ this.toggleEditor }
				/>
				{/*<EditorTicketListModal
					tickets={ eventDate.tickets }
					id={ `event-date-ticket-list-modal-${ eventDate.id }` }
					for={ `event-date-${ eventDate.id }` }
					editorOpen={ this.state.editorOpen }
					onEditorClose={ this.toggleEditor }
					buttonLabel={ buttonLabel }
					// changesSaved={ this.changesSaved }
				/>*/}
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorDateGridItem );
