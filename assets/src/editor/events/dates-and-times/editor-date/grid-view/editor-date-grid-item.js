/**
 * External imports
 */
import moment from 'moment-timezone';
import { Component, Fragment } from 'react';
import { __, sprintf, _x } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	MediumCalendarDate,
	withEntityPaperFrame,
} from '@eventespresso/components';

/**
 * Internal dependencies
 */
import {
	DatesAndTicketsManagerModal,
	EditorDateDetails,
	EditorDateSidebar,
} from '../';

/**
 * EditorDateGridItem
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
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

	toggleEditor = () => {
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
		// console.log( 'EditorDateGridItem.displayDate() eventDate: ', eventDate );
		let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
		sidebarColorClass += this.getBgColorClass( eventDate );
		const startDate = moment( eventDate.start );
		const endDate = moment( eventDate.end );

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
			allTickets,
			showDate = 'start',
			showDesc = 'excerpt',
			showVenue = true,
			onUpdate,
		} = this.props;
		// const statusClass = this.getStatusClass( eventDate );
		this.id = `event-date-ticket-list-modal-${ eventDate.id }`;
		const buttonLabel = __(
			'Close Event Date Ticket List ',
			'event_espresso'
		) + eventDate.id;
		this.buttonLabel = buttonLabel;

		let date = eventDate.start;
		if ( ! moment.isMoment( date ) ) {
			date = date instanceof Date ?
				date :
				new Date( date );
			date = moment( date );
		}
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
				<DatesAndTicketsManagerModal
					dates={ [ eventDate ] }
					tickets={ allTickets }
					editorOpen={ this.state.editorOpen }
					closeModal={ this.toggleEditor }
					onUpdate={ onUpdate }
					modalProps={ {
						title: sprintf(
							_x(
								'Ticket Assignments for: %1$s',
								'Ticket Assignments for: Date & date name',
								'event_espresso'
							),
							`${ eventDate.name } (${ date.format( 'ddd MMM' +
								' DD, YYYY' ) })`
						),
						// customClass: 'ee-event-date-tickets-manager-modal',
						closeButtonLabel: null,
					} }
				/>
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorDateGridItem );
