/**
 * External imports
 */
import { Dashicon } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { data } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * EditorDateDetails
 *
 * @function
 * @param {Object} eventDate    JSON object defining the Event Date
 * @return {string}    date details
 */
class EditorDateDetails extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			eventDate: props.eventDate ? props.eventDate : {},
		};
	}

	/**
	 * dateName
	 *
	 * @function
	 * @param {DateTime} eventDate    model object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( eventDate ) => {
		const htmlClass = eventDate.name && eventDate.name.length > 40 ?
			'ee-editor-date-name-heading ee-long-title' :
			'ee-editor-date-name-heading';
		return (
			<h1 className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-name-${ eventDate.id }` }
					type="text"
					value={ eventDate.name }
					onChange={ async ( name ) => {
						return await this.updateName( name, eventDate );
					} }
					label={ __( 'Date Name', 'event_espresso' ) }
				/>
			</h1>
		);
	};

	/**
	 * description
	 *
	 * @function
	 * @param {DateTime} eventDate model object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	description = ( eventDate, showDesc ) => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-date-desc-div ee-date-desc-excerpt' :
			'ee-editor-date-desc-div';
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-desc-${ eventDate.id }` }
					type="textarea"
					value={ eventDate.description }
					onChange={ async ( desc ) => {
						return await this.updateDescription( desc, eventDate );
					} }
					label={ __( 'Date Description', 'event_espresso' ) }
				/>
			</div>
		);
	};

	/**
	 * venueName
	 *spco-display-event-questions-lnk
	 * @function
	 * @param {Object} eventDate model object defining the Event Date
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
	 * @param {DateTime} eventDate    model object defining the Event Date
	 * @return {string}    date details
	 */
	dateSoldReservedCapacity = ( eventDate ) => {
		const details = [
			{
				id: `event-date-sold-${ eventDate.id }`,
				label: __( 'sold', 'event_espresso' ),
				value: eventDate.sold || 0,
			},
			{
				id: `event-date-reserved-${ eventDate.id }`,
				label: __( 'reserved', 'event_espresso' ),
				value: eventDate.reserved || 0,
			},
			{
				id: `event-date-capacity-${ eventDate.id }`,
				label: __( 'capacity', 'event_espresso' ),
				value: eventDate.regLimit || Infinity,
				editable: {
					type: 'text',
					valueType: 'number',
					onChange: async ( capacity ) => {
						return await this.updateCapacity( capacity, eventDate );
					},
				},
			},
			{
				id: `event-date-registrants-${ eventDate.id }`,
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
		let regListUrl = data.paths.admin_url;
		regListUrl += 'admin.php?page=espresso_registrations';
		regListUrl += `&event_id=${ eventDate.evtId }`;
		regListUrl += `&datetime_id=${ eventDate.id }`;
		regListUrl += '&action=default&return=edit';
		return (
			<a
				href={ regListUrl }
				title={ __( 'View registrations for this datetime.', 'event_espresso' ) }
				className={ 'ee-editor-date-details-reg-url-link' }
				target={ '_blank' }
				rel={ 'noopener norefferer' }
			>
				<span className="dashicons dashicons-groups clickable"></span>
			</a>
		);
	};

	/**
	 * @function
	 * @param {string} name new name for event date
	 * @param {DateTime} eventDate
	 * @return {boolean} true if saved
	 */
	updateName = async ( name, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, 'datetime' ) &&
			eventDate.name !== name
		) {
			eventDate.name = name;
			await dispatch( 'eventespresso/core' ).persistDatetimeRecord(
				eventDate
			);
			return true;
		}
		return false;
	};

	/**
	 * @function
	 * @param {string} description new description for event date
	 * @param {DateTime} eventDate
	 * @return {boolean} true if saved
	 */
	updateDescription = async ( description, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, 'datetime' ) &&
			eventDate.description !== description
		) {
			eventDate.description = description;
			await dispatch( 'eventespresso/core' ).persistDatetimeRecord(
				eventDate
			);
			return true;
		}
		return false;
	};

	/**
	 * @function
	 * @param {number|string} capacity new reg limit for event date
	 * @param {DateTime} eventDate
	 * @return {boolean} true if saved
	 */
	updateCapacity = async ( capacity, eventDate ) => {
		capacity = parseInt( capacity );
		if (
			isModelEntityOfModel( eventDate, 'datetime' ) &&
			eventDate.regLimit !== capacity
		) {
			eventDate.regLimit = capacity;
			await dispatch( 'eventespresso/core' ).persistDatetimeRecord(
				eventDate
			);
			return true;
		}
		return false;
	};

	render() {
		const eventDate = this.state.eventDate;
		// console.log(
		// 	'EditorDateDetails.render() eventDate',
		// 	eventDate
		// );
		const { showDesc = 'excerpt', showVenue } = this.props;
		return isModelEntityOfModel( eventDate, 'datetime' ) ? (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( eventDate ) }
				{ this.description( eventDate, showDesc ) }
				{ this.venueName( eventDate, showVenue ) }
				{ this.dateSoldReservedCapacity( eventDate ) }
			</div>
		) : null;
	}
}

export default EditorDateDetails;
