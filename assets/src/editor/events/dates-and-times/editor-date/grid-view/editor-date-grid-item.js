/**
 * External imports
 */
import moment from 'moment-timezone';
import { Component, Fragment } from 'react';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	MediumCalendarDate,
	withEntityPaperFrame,
} from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { default as EditorDateDetails } from './editor-date-details';
import { ActionsMenu } from '../';

/**
 * EditorDateGridItem
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 */
class EditorDateGridItem extends Component {
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

	render() {
		const {
			eventDate,
			allTickets,
			onUpdate,
			showDate = 'start',
			showDesc = 'excerpt',
			showVenue = true,
		} = this.props;
		// console.log( '' );
		// console.log( 'EditorDateGridItem.render() props: ', this.props );
		// console.log( 'EditorDateGridItem.render() eventDate: ', eventDate );

		const isPrimary = eventDate.isPrimary ? (
			<IconButton
				className="ee-primary-event-date"
				icon="star-empty"
				label={ __(
					'this is the primary date for this event',
					'event_espresso'
				) }
				labelPosition="top right"
			/>
		) : null;
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
				<ActionsMenu
					eventDate={ eventDate }
					allTickets={ allTickets }
					onUpdate={ onUpdate }
				/>
				{ isPrimary }
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorDateGridItem );
