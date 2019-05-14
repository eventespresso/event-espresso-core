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
import { ifCondition } from '@wordpress/compose';

const { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, getAdminUrl } = routes;

/**
 * Internal dependencies
 */
import { EditorDateActionsMenu } from '../';

const { MODEL_NAME: DATETIME, getBackgroundColorClass } = dateTimeModel;

/**
 * EditorDateListItem
 * Displays comEvent Date as a table row similar to existing event editor UI
 *
 * @function
 * @param {Object} date    JSON object defining the Event Date
 * @return {string}        The date rendered as a block
 */
class EditorDateListItem extends Component {
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
	 * dateSoldReservedCapacity
	 *
	 * @param {Object} event  The event object.
	 * @param {Object} eventDate    The date object.
	 * @return {string}    link to registrations list table for datetime
	 */
	getDatetimeRegistrationsLink = ( event, eventDate ) => {
		const regListUrl = addQueryArgs(
			getAdminUrl( ADMIN_ROUTES.REGISTRATIONS, ADMIN_ROUTE_ACTION_DEFAULT ),
			{
				event_id: event.id,
				datetime_id: eventDate.id,
				return: 'edit',
			}
		);
		return (
			<Tooltip
				text={ __(
					'view registrations for this datetime.',
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
		const {
			event,
			eventDate,
			allTickets,
			eventDateTicketMap,
		} = this.props;
		this.id = `event-date-ticket-list-modal-${ eventDate.id }`;
		const statusClass = this.getStatusClass( eventDate );
		const bgClass = getBackgroundColorClass( eventDate );
		const regLimit = eventDate.regLimit === 'INF' ||
		eventDate.regLimit === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			eventDate.regLimit;
		const regLink = this.getDatetimeRegistrationsLink( event, eventDate );

		return (
			<div id={ `ee-editor-date-list-view-div-${ eventDate.id }` }
				className={ `ee-editor-date-list-view-div ${ statusClass }` }
			>
				<div className="ee-editor-date-list-items">
					<div className={ `${ bgClass } ee-date-list-item` }>
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'ID:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.id }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Name:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.name }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Start Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.start.toFormat( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'End Date:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.end.toFormat( 'ddd MMM YY h:mm a' ) }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Sold:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.sold }
						</span>
					</div>
					<div className="ee-date-list-item">
						<span className="ee-date-list-item-label">
							{ __( 'Reserved:', 'event_espresso' ) }
						</span>
						<span className="ee-date-list-item-value">
							{ eventDate.reserved }
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
						<EditorDateActionsMenu
							event={ event }
							eventDate={ eventDate }
							allTickets={ allTickets }
							eventDateTicketMap={ eventDateTicketMap }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

export default ifCondition(
	( { eventDate } ) => isModelEntityOfModel( eventDate, DATETIME )
)( EditorDateListItem );

