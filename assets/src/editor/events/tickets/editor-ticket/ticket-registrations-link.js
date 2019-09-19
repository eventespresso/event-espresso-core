/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Dashicon, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { routes } from '@eventespresso/eejs';
import { useEventEditorEvent } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';

const { ADMIN_ROUTES, ADMIN_ROUTE_ACTION_DEFAULT, getAdminUrl } = routes;

/**
 * returns a rendered Dashicon wrapped in an HTML <a> tag that links to
 * the registrations admin list table filtered for the provided ticket
 *
 * @param {BaseEntity} ticketEntity    The ticket object.
 * @return {Object} rendered link to registrations list table for datetime
 */
const TicketRegistrationsLink = ( { ticketEntity: ticket } ) => {
	const { eventEntity } = useEventEditorEvent();
	return useMemo(
		() => {
			const regListUrl = addQueryArgs(
				getAdminUrl(
					ADMIN_ROUTES.REGISTRATIONS,
					ADMIN_ROUTE_ACTION_DEFAULT
				),
				{
					event_id: eventEntity.id,
					ticket_id: ticket.id,
					return: 'edit',
				}
			);
			return (
				<Tooltip
					text={ __(
						'view registrations for this ticket.',
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
		[ eventEntity.id, ticket.id ]
	);
};

TicketRegistrationsLink.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( TicketRegistrationsLink );
