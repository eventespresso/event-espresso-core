/**
 * External imports
 */
import classNames from 'classnames';
import { Dashicon, Tooltip } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { routes } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import {
	ifValidDateEntity,
	withEditorEventVenueEntity,
} from '../../../hocs';

const { MODEL_NAME: DATETIME } = dateTimeModel;
const {
	ADMIN_ROUTES,
	ADMIN_ROUTE_ACTIONS,
	ADMIN_ROUTE_ACTION_DEFAULT,
	getAdminUrl,
} = routes;
/**
 * EditorDateEntityDetails
 *
 * @function
 * @param {Object} dateEntity    JSON object defining the Event Date
 * @return {string}    date details
 */
class EditorDateEntityDetails extends Component {
	/**
	 * dateName
	 *
	 * @function
	 * @param {Object} dateEntity 	model object defining the Event Date
	 * @return {string}    date name
	 */
	dateName = ( dateEntity ) => {
		const htmlClass = classNames(
			'ee-editor-date-name-heading',
			{
				'ee-long-title': dateEntity.name && dateEntity.name.length > 40,
			}
		);
		return (
			<h1 className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-name-${ dateEntity.id }` }
					type="text"
					value={ dateEntity.name }
					onChange={ ( name ) => {
						return this.updateName( name, dateEntity );
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
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	description = ( dateEntity, showDesc ) => {
		const htmlClass = classNames(
			'ee-editor-date-desc-div',
			{
				'ee-date-desc-excerpt': showDesc === 'excerpt',
			}
		);
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `event-date-desc-${ dateEntity.id }` }
					type="textarea"
					value={ dateEntity.description }
					onChange={ ( desc ) => {
						return this.updateDescription( desc, dateEntity );
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
	 * @param {Object} venueEntity model object defining the Event Date Venue
	 * @param {boolean} showVenue
	 * @return {string} edit venue link
	 */
	venueName = ( venueEntity, showVenue ) => {
		if ( ! venueEntity || ! showVenue ) {
			return '';
		}
		const editVenueUrl = addQueryArgs(
			getAdminUrl(
				ADMIN_ROUTES.VENUES,
				ADMIN_ROUTE_ACTIONS.VENUES.EDIT
			),
			{
				post: venueEntity.id,
				return: 'edit',
			}
		);
		return (
			<h3 className="ee-editor-date-location-div">
				<Tooltip
					text={ __(
						'venue editor opens in a new window',
						'event_espresso',
					) }
				>
					<a
						href={ editVenueUrl }
						className="ee-editor-date-edit-venue-link"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Dashicon icon="admin-home" size={ 16 } />
						<span className="ee-editor-date-venue-name-span">
							{ venueEntity.name }
						</span>
						<Dashicon icon="external" size={ 12 } />
					</a>
				</Tooltip>
			</h3>
		);
	};

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventEntity        model object defining the Event
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @return {string}    date details
	 */
	dateSoldReservedCapacity = ( eventEntity, dateEntity ) => {
		const details = [
			{
				id: 'event-date-sold',
				label: __( 'sold', 'event_espresso' ),
				value: dateEntity.sold || 0,
			},
			{
				id: 'event-date-reserved',
				label: __( 'reserved', 'event_espresso' ),
				value: dateEntity.reserved || 0,
			},
			{
				id: 'event-date-capacity',
				label: __( 'capacity', 'event_espresso' ),
				value: dateEntity.regLimit || Infinity,
				editable: {
					type: 'text',
					valueType: 'number',
					onChange: ( capacity ) => {
						return this.updateCapacity( capacity, dateEntity );
					},
				},
			},
			{
				id: 'event-date-registrants',
				htmlClass: 'has-tooltip',
				label: __( 'registrants', 'event_espresso' ),
				value: this.getDatetimeRegistrationsLink( eventEntity, dateEntity ),
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
	 * @param {Object} eventEntity        Base entity instance for event.
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @return {string}    link to registrations list table for datetime
	 */
	getDatetimeRegistrationsLink = ( eventEntity, dateEntity ) => {
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
	 * @param {Object} dateEntity    model object defining the Event Date
	 */
	updateName = ( name, dateEntity ) => {
		if (
			isModelEntityOfModel( dateEntity, DATETIME ) &&
			dateEntity.name !== name
		) {
			dateEntity.name = name;
		}
	};

	/**
	 * @function
	 * @param {string} description 	new description for event date
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @return {boolean} true if saved
	 */
	updateDescription = async ( description, dateEntity ) => {
		if (
			isModelEntityOfModel( dateEntity, DATETIME ) &&
			dateEntity.description !== description
		) {
			dateEntity.description = description;
		}
	};

	/**
	 * @function
	 * @param {number|string} 		capacity new reg limit for event date
	 * @param {Object} dateEntity    model object defining the Event Date
	 */
	updateCapacity = ( capacity, dateEntity ) => {
		capacity = parseInt( capacity, 10 );
		if (
			isModelEntityOfModel( dateEntity, DATETIME ) &&
			dateEntity.regLimit !== capacity
		) {
			dateEntity.regLimit = capacity;
		}
	};

	render() {
		const { eventEntity, dateEntity, venueEntity } = this.props;
		const { showDesc = 'excerpt', showVenue = true } = this.props;
		return (
			<div className={ 'ee-editor-date-details-wrapper-div' }>
				{ this.dateName( dateEntity ) }
				{ this.description( dateEntity, showDesc ) }
				{ this.venueName( venueEntity, showVenue ) }
				{ this.dateSoldReservedCapacity( eventEntity, dateEntity ) }
			</div>
		);
	}
}

export default compose( [
	ifValidDateEntity,
	withEditorEventVenueEntity,
] )( EditorDateEntityDetails );
