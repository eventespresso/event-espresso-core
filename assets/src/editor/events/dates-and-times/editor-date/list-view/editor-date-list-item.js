/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EditorDateActionsMenu } from '../';

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
	 * getBgColorClass
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    CSS class corresponding to the background color for
	 *   the container
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
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    link to registrations list table for datetime
	 */
	getDatetimeRegistrationsLink = ( eventDate ) => {
		return (
			<a
				href={ eventDate.reg_list_url }
				aria-label={ __(
					'View registrations for this datetime.',
					'event_espresso'
				) }
				className={ 'ee-editor-date-details-reg-url-link' }
				target={ '_blank' }
				rel={ 'noopener norefferer' }
			>
				<span className="dashicons dashicons-groups clickable"></span>
			</a>
		);
	};

	render() {
		const { eventDate, allTickets, onUpdate } = this.props;
		if ( ! isModelEntityOfModel( eventDate, dateTimeModel.MODEL_NAME ) ) {
			return null;
		}
		// console.log( '' );
		// console.log( 'EditorDateListItem.render()' );
		// console.log( ' > props: ', this.props );
		this.id = `event-date-ticket-list-modal-${ eventDate.id }`;
		const statusClass = this.getStatusClass( eventDate );
		const bgClass = this.getBgColorClass( eventDate );
		const regLimit = eventDate.regLimit === 'INF' ||
		eventDate.regLimit === Infinity ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			eventDate.regLimit;
		const regLink = this.getDatetimeRegistrationsLink( eventDate );

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
							eventDate={ eventDate }
							allTickets={ allTickets }
							onUpdate={ onUpdate }
						/>
					</div>
				</div>
				<div className={ 'clear-float' }></div>
			</div>
		);
	}
}

export default EditorDateListItem;
