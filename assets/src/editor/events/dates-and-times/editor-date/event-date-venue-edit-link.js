/**
 * External imports
 */
import { Dashicon, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { routes } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
import { useEventForEventDate, useEventVenue } from '@eventespresso/hooks';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { ADMIN_ROUTES, ADMIN_ROUTE_ACTIONS, getAdminUrl } = routes;

/**
 * returns a rendered Dashicon wrapped in an HTML <a> tag that links to
 * the registrations admin list table filtered for the provided eventDate
 *
 * @param {BaseEntity} eventDate    The date object.
 * @param {boolean} showVenue
 * @param {string} wrapperElement   html element tag to wrap link with
 * @return {Object} rendered link to registrations list table for datetime
 */
const EventDateVenueEditLink = ( { eventDate, showVenue, wrapperElement } ) => {
	const { eventEntity } = useEventForEventDate( eventDate );
	const { venue } = useEventVenue( eventEntity );
	let venueId = 0;
	let venueName = '';
	if ( isModelEntityOfModel( venue, 'venue' ) ) {
		venueId = venue.id;
		venueName = venue.name;
	}
	const WrapperElement = wrapperElement ? wrapperElement : 'h3';
	return useMemo(
		() => {
			if ( venueId === 0 || ! showVenue ) {
				return '';
			}
			const editVenueUrl = addQueryArgs(
				getAdminUrl(
					ADMIN_ROUTES.VENUES,
					ADMIN_ROUTE_ACTIONS.VENUES.EDIT
				),
				{
					post: venueId,
					return: 'edit',
				}
			);
			return (
				<WrapperElement className="ee-editor-date-location-div">
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
								{ venueName }
							</span>
							<Dashicon icon="external" size={ 14 } />
						</a>
					</Tooltip>
				</WrapperElement>
			);
		},
		[ venueId, venueName, showVenue, wrapperElement ]
	);
};

export default EventDateVenueEditLink;
