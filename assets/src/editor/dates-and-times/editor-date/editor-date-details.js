/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * EditorDateDetails
 *
 * @function
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string}    date details
 */
export class EditorDateDetails extends Component {
	/**
	 * dateName
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( eventDate ) => {
		return eventDate.name ?
			(
				<h4 className={ 'ee-editor-date-name-heading' }>
					{ eventDate.name }
				</h4>
			) :
			'';
	};

	/**
	 * venueName
	 *
	 * @function
	 * @param {Object} eventDate    JSON object defining the Event Date
	 * @return {string}    venue name
	 */
	venueName = ( eventDate ) => {
		return eventDate.venue ?
			(
				<div className="ee-editor-date-location-div">
					<span className="dashicons dashicons-location"></span>{ eventDate.venue }
				</div>
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
		const regLimit = eventDate.reg_limit === 'INF' ?
			( <span className={ 'ee-infinity-sign' }>&infin;</span> ) :
			eventDate.reg_limit;
		const regLink = this.getDatetimeRegistrationsLink( eventDate );
		return (
			<div className="ee-editor-date-details-sold-rsrvd-cap-div">
				{ this.dateDetailsValue( 'sold', eventDate.sold, __( 'sold', 'event_espresso' ) ) }
				{ this.dateDetailsDataSeparator() }
				{ this.dateDetailsValue( 'reserved', eventDate.reserved, __( 'reserved', 'event_espresso' ) ) }
				{ this.dateDetailsDataSeparator() }
				{ this.dateDetailsValue( 'capacity', regLimit, __( 'capacity', 'event_espresso' ) ) }
				{ this.dateDetailsDataSeparator() }
				{ this.dateDetailsValue( 'registrations', regLink, __( 'registrations', 'event_espresso' ) ) }
			</div>
		);
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
				<span className="dashicons dashicons-groups clickable ee-grow"></span>
			</a>
		);
	};

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {string} detail   the data item being displayed
	 * @param {string} value    the data item being displayed
	 * @param {string} label   the data item being displayed
	 * @return {string}    date details
	 */
	dateDetailsValue = ( detail, value, label ) => {
		return (
			<div className={ `ee-editor-date-details-div date-details-${ detail }-div` }>
				<div className={ `ee-editor-date-details-value-div date-details-${ detail }-value` }>
					{ value }
				</div>
				<div className={ `ee-editor-date-details-label-div date-details-${ detail }-label` }>
					{ label }
				</div>
			</div>
		);
	};

	/**
	 * dateDetailsDataSeparator
	 *
	 * @function
	 * @return {string} vertical line for separating date details
	 */
	dateDetailsDataSeparator = () => {
		return <div className="ee-editor-date-details-sep"></div>;
	};

	render() {
		const { eventDate } = this.props;

		return (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( eventDate ) }
				{ this.venueName( eventDate ) }
				{ this.dateSoldReservedCapacity( eventDate ) }
			</div>
		);
	}
}
