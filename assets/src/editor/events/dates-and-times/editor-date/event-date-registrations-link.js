/**
 * External imports
 */
import { Dashicon, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { routes } from '@eventespresso/eejs';
import { __ } from '@eventespresso/i18n';
InlineEditEventDateName

const { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, getAdminUrl } = routes;

/**
 * returns a rendered Dashicon wrapped in an HTML <a> tag that links to
 * the registrations admin list table filtered for the provided eventDate
 *
 * @param {BaseEntity} dateEntity    The date object.
 * @return {Object} rendered link to registrations list table for datetime
 */
const EventDateRegistrationsLink = ( { dateEntity } ) => {
	return useMemo(
		() => {
			const regListUrl = addQueryArgs(
				getAdminUrl(
					ADMIN_ROUTES.REGISTRATIONS,
					ADMIN_ROUTE_ACTION_DEFAULT
				),
				{
					event_id: dateEntity.evtId,
					datetime_id: dateEntity.id,
					return: 'edit',
				}
			);
			return (
				<Tooltip
					text={ __(
						'view registrations for this date.',
						'event_espresso'
					) }
				>
					<a
						href={ regListUrl }
						className={ 'ee-editor-details-reg-url-link' }
						target={ '_blank' }
						rel={ 'noopener norefferer' }
					>
						<Dashicon icon="groups" size={ 24 } />
					</a>
				</Tooltip>
			);
		},
		[ dateEntity.evtId, dateEntity.id ]
	);
};

EventDateRegistrationsLink.propTypes = {
	dateEntity: PropTypes.string.isRequired,
};

export default ifValidDateEntity( EventDateRegistrationsLink );
