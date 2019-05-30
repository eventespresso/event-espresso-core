/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	CalendarDateRange,
	EntityLock,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import EditorDateDetails from './editor-date-details';
import { EditorDateActionsMenu } from '../';

const { getBackgroundColorClass, getDateTimeStatusTextLabel } = dateTimeModel;

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
		let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
		sidebarColorClass += getBackgroundColorClass( eventDate );
		const dateStatus = (
			<span key={ 1 }>{ getDateTimeStatusTextLabel( eventDate ) }</span>
		);
		switch ( showDate ) {
			case 'end' :
				const end = eventDate.end.toFormat( 'h:mm a' );
				return <BiggieCalendarDate
					date={ eventDate.end }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'ends', 'event_espresso' ) }
					footerText={ [ end, dateStatus ] }
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
				const start = eventDate.start.toFormat( 'h:mm a' );
				return <BiggieCalendarDate
					date={ eventDate.start }
					htmlClass={ sidebarColorClass }
					headerText={ __( 'starts', 'event_espresso' ) }
					footerText={ [ start, dateStatus ] }
				/>;
		}
	};

	/**
	 * @function
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {Object} eventDate
	 */
	toggleLock = ( event, eventDate ) => {
		if ( isModelEntityOfModel( eventDate, 'datetime' ) ) {
			eventDate.isPrimary = ! eventDate.isPrimary;
		}
		return eventDate;
	};

	render() {
		const {
			event,
			eventDate,
			allTickets,
			showDate = 'start',
			showDesc = 'excerpt',
			showVenue = true,
		} = this.props;
		if ( ! isModelEntityOfModel( eventDate, 'datetime' ) ) {
			return null;
		}
		const dateStyleClass = classNames(
			'ee-editor-date-main',
			{
				'ee-editor-date-range': showDate === 'both',
				'ee-editor-date-single': showDate !== 'both',
			}
		);
		return (
			<Fragment>
				<div className={ dateStyleClass }>
					{ this.displayDate( eventDate, showDate ) }
					<EditorDateDetails
						event={ event }
						eventDate={ eventDate }
						showDesc={ showDesc }
						showVenue={ showVenue }
					/>
				</div>
				<EditorDateActionsMenu
					event={ event }
					eventDate={ eventDate }
					allTickets={ allTickets }
				/>
				<EntityLock
					entity={ eventDate }
					isLocked={ !! eventDate.locked }
					toggleEntityLock={ ( date ) => this.toggleLock(
						event,
						date
					) }
				/>
			</Fragment>
		);
	}
}

export default withEntityPaperFrame( EditorDateGridItem );
