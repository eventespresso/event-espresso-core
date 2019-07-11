/**
 * External imports
 */
import classNames from 'classnames';
import { Dashicon, Tooltip } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { routes } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';

import { useEditorEventEntity, useEventVenueEntity } from '../../../hooks';
import DateEntityRegistrationsLink from '../date-entity-registrations-link';

const {
	ADMIN_ROUTES,
	ADMIN_ROUTE_ACTIONS,
	getAdminUrl,
} = routes;

const EditorDateEntityDetails = ( {
	dateEntity,
	refreshed,
	showDesc = 'excerpt',
	showVenue = true,
} ) => {
	const eventEntity = useEditorEventEntity();
	const { venueEntity } = useEventVenueEntity( eventEntity );
	/**
	 * dateName
	 *
	 * @function
	 * @param {Object} dateEntity 	model object defining the Event Date
	 * @return {string}    date name
	 */
	const dateName = useMemo(
		() => {
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
							dateEntity.name = name;
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
		},
		[ dateEntity, refreshed ]
	);

	/**
	 * description
	 *
	 * @function
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @param {string} showDesc
	 * @return {string} date description
	 */
	const description = useMemo(
		() => {
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
							dateEntity.description = desc;
						} }
						label={ __( 'Date Description', 'event_espresso' ) }
					/>
				</div>
			);
		},
		[ dateEntity, showDesc, refreshed ]
	);

	/**
	 * venueName
	 *spco-display-event-questions-lnk
	 * @function
	 * @param {Object} venueEntity model object defining the Event Date Venue
	 * @param {boolean} showVenue
	 * @return {string} edit venue link
	 */
	const venueName = useMemo(
		() => {
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
							<Dashicon icon="external" size={ 14 } />
						</a>
					</Tooltip>
				</h3>
			);
		},
		[ venueEntity, showVenue, refreshed ]
	);

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventEntity        Base entity instance for event.
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @return {string}    link to registrations list table for datetime
	 */
	const getDatetimeRegistrationsLink = useMemo(
		() => <DateEntityRegistrationsLink dateEntity={ dateEntity } />,
		[ dateEntity ]
	);

	/**
	 * dateSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} eventEntity        model object defining the Event
	 * @param {Object} dateEntity    model object defining the Event Date
	 * @return {string}    date details
	 */
	const dateSoldReservedCapacity = useMemo(
		() => {
			const details = [
				{
					id: 'ee-event-date-sold',
					label: __( 'sold', 'event_espresso' ),
					value: dateEntity.sold || 0,
				},
				{
					id: 'ee-event-date-reserved',
					label: __( 'reserved', 'event_espresso' ),
					value: dateEntity.reserved || 0,
				},
				{
					id: 'ee-event-date-capacity',
					label: __( 'capacity', 'event_espresso' ),
					value: dateEntity.regLimit || Infinity,
					editable: {
						type: 'text',
						valueType: 'number',
						onChange: ( capacity ) => {
							dateEntity.regLimit = parseInt( capacity || 0, 10 );
						},
					},
				},
				{
					id: 'ee-event-date-registrants',
					htmlClass: 'ee-has-tooltip',
					label: __( 'registrants', 'event_espresso' ),
					value: getDatetimeRegistrationsLink,
				},
			];
			return <EntityDetailsPanel
				details={ details }
				htmlClass="ee-editor-date-details-sold-rsrvd-cap-div"
			/>;
		},
		[ getDatetimeRegistrationsLink, dateEntity, eventEntity, refreshed ]
	);
	return (
		<div className={ 'ee-editor-date-details-wrapper-div' }>
			{ dateName }
			{ description }
			{ venueName }
			{ dateSoldReservedCapacity }
		</div>
	);
};

export default compose( [
	ifValidDateEntity,
] )( EditorDateEntityDetails );
