/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	MediumCalendarDate,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { default as EditorDateDetails } from './editor-date-details';
import { EditorDateActionsMenu } from '../';

const { status, DATETIME_STATUS_ID, MODEL_NAME } = dateTimeModel;

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
		switch ( status( eventDate ) ) {
			case DATETIME_STATUS_ID.ACTIVE :
				return 'ee-datetime-active';
			case DATETIME_STATUS_ID.EXPIRED :
				return 'ee-datetime-expired';
			case DATETIME_STATUS_ID.SOLD_OUT :
				return 'ee-datetime-sold-out';
			case DATETIME_STATUS_ID.UPCOMING :
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
		switch ( status( eventDate ) ) {
			case DATETIME_STATUS_ID.ACTIVE :
				return 'ee-green-background';
			case DATETIME_STATUS_ID.EXPIRED :
				return 'ee-lt-grey-background';
			case DATETIME_STATUS_ID.SOLD_OUT :
				return 'ee-orange-background';
			case DATETIME_STATUS_ID.UPCOMING :
			default:
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
		// const startDate = moment( eventDate.start );
		// const endDate = moment( eventDate.end );

		switch ( showDate ) {
			case 'end' :
				return <BiggieCalendarDate
					date={ eventDate.end }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'ends', 'event_espresso' ) }
					footerText={ eventDate.end.toFormat( 'h:mm a' ) }
				/>;
			case 'both' :
				return (
					<div className={
						`${ sidebarColorClass } medium-calendar-date-wrapper`
					} >
						<MediumCalendarDate
							date={ eventDate.start }
							footerText={ eventDate.start.toFormat( 'h:mm a' ) }
						/>
						<MediumCalendarDate
							date={ eventDate.end }
							headerText={ __( 'to', 'event_espresso' ) }
							footerText={ eventDate.end.toFormat( 'h:mm a' ) }
						/>
					</div>
				);
			case 'start' :
			default :
				return <BiggieCalendarDate
					date={ eventDate.start }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'starts', 'event_espresso' ) }
					footerText={ eventDate.start.toFormat( 'h:mm a' ) }
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
		if ( ! isModelEntityOfModel( eventDate, MODEL_NAME ) ) {
			return null;
		}

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
				<EditorDateActionsMenu
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
