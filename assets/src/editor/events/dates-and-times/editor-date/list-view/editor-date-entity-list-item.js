/**
 * External imports
 */
import { Dashicon, Tooltip } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { routes } from '@eventespresso/eejs';
import { addQueryArgs } from '@wordpress/url';
import { ifCondition, compose } from '@wordpress/compose';

const { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, getAdminUrl } = routes;

/**
 * Internal dependencies
 */
import EditorDateEntityActionsMenu
	from '../actions-menu/editor-date-entity-actions-menu';
import { withEditorEventEntity } from '../../../hocs';

const { MODEL_NAME: DATETIME, getBackgroundColorClass } = dateTimeModel;

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 * @return {string}        The date rendered as a block
 */
class EditorDateEntityListItem extends Component {
	/**
	 * getStatusClass
	 *
	 * @function
	 * @param {Object} dateEntity    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the Date status
	 */
	getStatusClass = ( dateEntity ) => {
		switch ( dateEntity.status ) {
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
	 * dateSoldReservedCapacity
	 *
	 * @param {Object} eventEntity  The event object.
	 * @param {Object} dateEntity    The date object.
	 * @return {string}    link to registrations list table for datetime
	 */
	getDateRegistrationsLink = ( eventEntity, dateEntity ) => {
		const regListUrl = addQueryArgs(
			getAdminUrl( ADMIN_ROUTES.REGISTRATIONS, ADMIN_ROUTE_ACTION_DEFAULT ),
			{
				event_id: eventEntity.id,
				datetime_id: dateEntity.id,
				return: 'edit',
			}
		);
		return (
			<Tooltip
				text={ __(
					'view registrations for this date.',
					'event_espresso'
				) }
			>
				<a
					href={ regListUrl }
					className={ 'ee-editor-date-details-reg-url-link' }
					target={ '_blank' }
					rel={ 'noopener norefferer' }
				>
					<Dashicon icon="groups" size={ 24 } />
				</a>
			</Tooltip>
		);
	};

	render() {
		const { eventEntity, dateEntity } = this.props;
		this.id = `event-date-ticket-list-modal-${ dateEntity.id }`;
		const statusClass = this.getStatusClass( dateEntity );
		const bgClass = getBackgroundColorClass( dateEntity );
		const regLimit = dateEntity.regLimit === 'INF' ||
		dateEntity.regLimit === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			dateEntity.regLimit;
		const regLink = this.getDateRegistrationsLink( eventEntity, dateEntity );

		return (
			<div id={ `ee-editor-date-list-view-div-${ dateEntity.id }` }
				className={ `ee-editor-date-list-view-div ${ statusClass }` }
			>
				<div className="ee-editor-date-list-items">
					<div className={ `${ bgClass } ee-date-list-item` }>
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'ID:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.id }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Start Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.start.toFormat( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'End Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.end.toFormat( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Sold:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.sold }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Reserved:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ dateEntity.reserved }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Capacity:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ regLimit }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Registrants:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ regLink }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Actions:', 'event_espresso' ) }
						</span>
						<EditorDateEntityActionsMenu
							eventEntity={ eventEntity }
							dateEntity={ dateEntity }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

export default compose( [
	ifCondition(
		( { dateEntity } ) => isModelEntityOfModel( dateEntity, DATETIME )
	),
	withEditorEventEntity,
] )( EditorDateEntityListItem );

