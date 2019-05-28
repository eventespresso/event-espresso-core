/**
 * External imports
 */
import { Dashicon, Tooltip } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { routes } from '@eventespresso/eejs';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import classNames from 'classnames';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, getAdminUrl } = routes;
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
	 * @param {Object} eventDate 	model object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( eventDate ) => {
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
					onChange={ ( name ) => {
						return this.updateName( name, eventDate );
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
	 * @param {Object} eventDate    model object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	description = ( eventDate, showDesc ) => {
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
					onChange={ ( desc ) => {
						return this.updateDescription( desc, eventDate );
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
					onChange: ( capacity ) => {
						return this.updateCapacity( capacity, eventDate );
					},
				},
			},
			{
				id: `event-date-registrants-${ eventDate.id }`,
				htmlClass: 'has-tooltip',
				label: __( 'registrants', 'event_espresso' ),
				value: this.getDatetimeRegistrationsLink( event, eventDate ),
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
	 * @param {Object} event        Base entity instance for event.
	 * @param {Object} eventDate    model object defining the Event Date
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

	/**
	 * @function
	 * @param {string} name 		new name for event date
	 * @param {Object} eventDate    model object defining the Event Date
	 */
	updateName = ( name, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.name !== name
		) {
			eventDate.name = name;
		}
	};

	/**
	 * @function
	 * @param {string} description 	new description for event date
	 * @param {Object} eventDate    model object defining the Event Date
	 * @return {boolean} true if saved
	 */
	updateDescription = async ( description, eventDate ) => {
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.description !== description
		) {
			eventDate.description = description;
		}
	};

	/**
	 * @function
	 * @param {number|string} 		capacity new reg limit for event date
	 * @param {Object} eventDate    model object defining the Event Date
	 */
	updateCapacity = ( capacity, eventDate ) => {
		capacity = parseInt( capacity );
		if (
			isModelEntityOfModel( eventDate, DATETIME ) &&
			eventDate.regLimit !== capacity
		) {
			eventDate.regLimit = capacity;
		}
	};

	render() {
		const { event, eventDate } = this.props;
		const { showDesc = 'excerpt', showVenue } = this.props;
		return isModelEntityOfModel( eventDate, DATETIME ) ? (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( eventDate ) }
				{ this.description( eventDate, showDesc ) }
				{ this.venueName( eventDate, showVenue ) }
				{ this.dateSoldReservedCapacity( event, eventDate ) }
			</div>
		) : null;
	}
}

export default EditorDateDetails;
