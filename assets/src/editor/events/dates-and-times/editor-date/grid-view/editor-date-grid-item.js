/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	CalendarDateRange,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { default as EditorDateDetails } from './editor-date-details';
import { EditorDateActionsMenu } from '../';

const { getBackgroundColorClass, MODEL_NAME } = dateTimeModel;

/**
 * EditorDateGridItem
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 */
class EditorDateGridItem extends Component {
	/**
	 * @function
	 * @param {Object} eventDate
	 * @param {string} showDate
	 * @return {Object} rendered date
	 */
	displayDate = ( eventDate, showDate ) => {
		// console.log( 'EditorDateGridItem.displayDate()' );
		// console.log( '> eventDate: ', eventDate );
		let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
		sidebarColorClass += getBackgroundColorClass( eventDate );
		// console.log( '> sidebarColorClass: ', sidebarColorClass );
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
					<CalendarDateRange
						startDate={ eventDate.start }
						endDate={ eventDate.end }
						htmlClass={ sidebarColorClass }
					/>
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
		const dateStyleClass = showDate === 'both' ?
			'ee-editor-date-range' :
			'ee-editor-date-single';
		return (
			<Fragment>
				<div className={ `ee-editor-date-main ${ dateStyleClass }` }>
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
