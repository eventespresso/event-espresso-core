/**
 * External imports
 */
import { Dashicon, Tooltip } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { data } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { updateEventDate } from '../action-handlers/update-event-date';

const { MODEL_NAME: DATETIME } = dateTimeModel;
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
	 * @param {Object} event 		model object defining the Event
	 * @param {Object} eventDate 	model object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( event, eventDate ) => {
		const htmlClass = classNames(
			'ee-editor-date-name-heading',
			{
				'ee-long-title': eventDate.name && eventDate.name.length > 40,
			}
		);
		return (
			<h1 className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-name-${ eventDate.id }` }
					type="text"
					value={ eventDate.name }
					onChange={ async ( name ) => {
						return await this.updateName( name, event, eventDate );
					} }
					label={ __( 'Date Name', 'event_espresso' ) }
					noticeStyle={
						{
							left: '50px',
						}
					}
				/>
			</h1>
		);
	};

	/**
	 * description
	 *
	 * @function
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	description = ( event, eventDate, showDesc ) => {
		const htmlClass = classNames(
			'ee-editor-date-desc-div',
			{
				'ee-date-desc-excerpt': showDesc === 'excerpt',
			}
		);
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-desc-${ eventDate.id }` }
					type="textarea"
					value={ eventDate.description }
					onChange={ async ( desc ) => {
						return await this.updateDescription(
							desc,
							event,
							eventDate
						);
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
	 * @param {Object} eventDate    model object defining the Event Date
	 * @param {boolean} showVenue
	 * @return {string}    venue name
	 */
	venueName = ( eventDate, showVenue ) => {
		return showVenue && eventDate.venue ?
			(
				<h3 className="ee-editor-date-location-div">
					<Tooltip
						text={ __(
							'venue editor opens in a new window',
							'event_espresso',
						) }
					>
						<a
							href={ eventDate.edit_venue_link }
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
					</Tooltip>
				</h3>
			) :
			'';
	};

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {string}    date details
	 */
	dateSoldReservedCapacity = ( event, eventDate ) => {
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
						return await this.updateCapacity(
							capacity,
							event,
							eventDate
						);
					},
				},
			},
			{
				id: `event-date-registrants-${ eventDate.id }`,
				htmlClass: 'has-tooltip',
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
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {string}    link to registrations list table for datetime
	 */
	getDatetimeRegistrationsLink = ( eventDate ) => {
		let regListUrl = data.paths.admin_url;
		regListUrl += 'admin.php?page=espresso_registrations';
		regListUrl += `&event_id=${ eventDate.evtId }`;
		regListUrl += `&datetime_id=${ eventDate.id }`;
		regListUrl += '&action=default&return=edit';
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

	/**
	 * @function
	 * @param {string} name 		new name for event date
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {boolean} true if saved
	 */
	updateName = async ( name, event, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.name !== name
		) {
			eventDate.name = name;
			return updateEventDate( event, eventDate );
		}
	};

	/**
	 * @function
	 * @param {string} description 	new description for event date
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {boolean} true if saved
	 */
	updateDescription = async ( description, event, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.description !== description
		) {
			eventDate.description = description;
			return updateEventDate( event, eventDate );
		}
	};

	/**
	 * @function
	 * @param {number|string} 		capacity new reg limit for event date
	 * @param {Object} event        model object defining the Event
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {boolean} true if saved
	 */
	updateCapacity = async ( capacity, event, eventDate ) => {
		capacity = parseInt( capacity );
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.regLimit !== capacity
		) {
			eventDate.regLimit = capacity;
			return updateEventDate( event, eventDate );
		}
	};

	render() {
		const { event, eventDate } = this.props;
		const { showDesc = 'excerpt', showVenue } = this.props;
		return isModelEntityOfModel( eventDate, DATETIME ) ? (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( event, eventDate ) }
				{ this.description( event, eventDate, showDesc ) }
				{ this.venueName( eventDate, showVenue ) }
				{ this.dateSoldReservedCapacity( event, eventDate ) }
			</div>
		) : null;
	}
}

export default EditorDateDetails;
