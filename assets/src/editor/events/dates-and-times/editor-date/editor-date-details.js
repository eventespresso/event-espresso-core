/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';
import { Dashicon } from '@wordpress/components';
import { EntityDetailsPanel } from '@eventespresso/components';

/**
 * EditorDateDetails
 *
 * @function
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string}    date details
 */
class EditorDateDetails extends Component {
	/**
	 * dateName
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( eventDate ) => {
		const htmlClass = eventDate.name && eventDate.name.length > 40 ?
			'ee-editor-date-name-heading ee-long-title' :
			'ee-editor-date-name-heading';
		return eventDate.name ?
			<h1 className={ htmlClass }>{ eventDate.name }</h1> : '';
	};

	/**
	 * description
	 *
	 * @function
	 * @param {Object} eventDate JSON object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	description = ( eventDate, showDesc ) => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-date-desc-div ee-date-desc-excerpt' :
			'ee-editor-date-desc-div';
		return (
			<div className={ htmlClass }>
				{ eventDate.description }
			</div>
		);
	};

	/**
	 * venueName
	 *
	 * @function
	 * @param {Object} eventDate JSON object defining the Event Date
	 * @param {boolean} showVenue
	 * @return {string}    venue name
	 */
	venueName = ( eventDate, showVenue ) => {
		return showVenue && eventDate.venue ?
			(
				<h3 className="ee-editor-date-location-div">
					<a
						href={ eventDate.edit_venue_link }
						title={ __(
							'venue editor opens in a new window',
							'event_espresso',
						) }
						className="ee-editor-date-edit-venue-link"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Dashicon icon="location" size={ 16 } />
						<span className="ee-editor-date-venue-name-span">
							{ eventDate.venue }
						</span>
						<Dashicon icon="external" size={ 12 } />
					</a>
				</h3>
			) :
			'';
	};

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    date details
	 */
	dateSoldReservedCapacity = ( eventDate ) => {
		const details = [
			{
				id: 'event-date-sold',
				label: __( 'sold', 'event_espresso' ),
				value: eventDate.sold,
			},
			{
				id: 'event-date-reserved',
				label: __( 'reserved', 'event_espresso' ),
				value: eventDate.reserved,
			},
			{
				id: 'event-date-capacity',
				label: __( 'capacity', 'event_espresso' ),
				value: eventDate.regLimit,
			},
			{
				id: 'event-date-registrants',
				label: __( 'registrants', 'event_espresso' ),
				value: this.getDatetimeRegistrationsLink( eventDate ),
			},
		];
		return <EntityDetailsPanel
			details={ details }
			htmlClass="ee-editor-date-details-sold-rsrvd-cap-div"
		/>;
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
				title={ __( 'View registrations for this datetime.', 'event_espresso' ) }
				className={ 'ee-editor-date-details-reg-url-link' }
				target={ '_blank' }
				rel={ 'noopener norefferer' }
			>
				<span className="dashicons dashicons-groups clickable"></span>
			</a>
		);
	};

	render() {
		const { eventDate, showDesc = 'excerpt', showVenue } = this.props;
		return (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( eventDate ) }
				{ this.description( eventDate, showDesc ) }
				{ this.venueName( eventDate, showVenue ) }
				{ this.dateSoldReservedCapacity( eventDate ) }
			</div>
		);
	}
}

export default EditorDateDetails;
