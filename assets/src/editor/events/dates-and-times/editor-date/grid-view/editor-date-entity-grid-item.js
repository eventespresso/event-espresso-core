/**
 * External imports
 */
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	BiggieCalendarDate,
	CalendarDateRange,
	withEntityPaperFrame,
} from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import classNames from 'classnames';
import { compose, ifCondition } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import EditorDateEntityDetails from './editor-date-entity-details';
import EditorDateEntityActionsMenu
	from '../actions-menu/editor-date-entity-actions-menu';
import { withEditorEventEntity } from '../../../hocs';

const { getBackgroundColorClass, getDateTimeStatusTextLabel } = dateTimeModel;

/**
 * EditorDateGridItem
 * Component for displaying an Event Date as a visual block in grid views
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 */
class EditorDateEntityGridItem extends Component {
	/**
	 * @function
	 * @param {Object} dateEntity
	 * @param {string} showDate
	 * @return {Object} rendered date
	 */
	displayDate = ( dateEntity, showDate ) => {
		let sidebarColorClass = 'ee-editor-date-calendar-sidebar ';
		sidebarColorClass += getBackgroundColorClass( dateEntity );
		const dateStatus = (
			<div key={ dateEntity.id + '-status' } className={ 'ee-status-tag' }>
				{ getDateTimeStatusTextLabel( dateEntity ) }
			</div>
		);
		switch ( showDate ) {
			case 'end' :
				const endTime = dateEntity.end.toFormat( 'h:mm a' );
				return (
					<BiggieCalendarDate
						key={ dateEntity.id + '-end' }
						date={ dateEntity.end }
						htmlClass={ sidebarColorClass }
						headerText={ __( 'ends', 'event_espresso' ) }
						footerText={ [ endTime, dateStatus ] }
					/>
				);
			case 'both' :
				return (
					<CalendarDateRange
						key={ dateEntity.id + '-both' }
						startDate={ dateEntity.start }
						endDate={ dateEntity.end }
						htmlClass={ sidebarColorClass }
						headerText={ __( 'Event Date', 'event_espresso' ) }
						footerText={ dateStatus }
						showTime
					/>
				);
			case 'start' :
			default :
				const startTime = dateEntity.start.toFormat( 'h:mm a' );
				return (
					<BiggieCalendarDate
						key={ dateEntity.id + '-start' }
						date={ dateEntity.start }
						htmlClass={ sidebarColorClass }
						headerText={ __( 'starts', 'event_espresso' ) }
						footerText={ [ startTime, dateStatus ] }
					/>
				);
		}
	};

	render() {
		const {
			dateEntity,
			eventEntity,
			showDate = 'start',
			showDesc = 'excerpt',
			showVenue = true,
		} = this.props;
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
					{ this.displayDate( dateEntity, showDate ) }
					<EditorDateEntityDetails
						key={ dateEntity.id + '-details' }
						eventEntity={ eventEntity }
						dateEntity={ dateEntity }
						showDesc={ showDesc }
						showVenue={ showVenue }
					/>
				</div>
				<EditorDateEntityActionsMenu
					key={ dateEntity.id + '-menu' }
					eventEntity={ eventEntity }
					dateEntity={ dateEntity }
				/>
			</Fragment>
		);
	}
}

export default compose( [
	ifCondition(
		( { dateEntity } ) => isModelEntityOfModel(
			dateEntity,
			'datetime'
		)
	),
	withEditorEventEntity,
	withEntityPaperFrame,
] )( EditorDateEntityGridItem );
