import React from 'react';
import { addQueryArgs } from '@wordpress/url';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

import { ADMIN_ROUTES } from '@sharedConstants/adminRoutes';
import { EspressoIcon, Icon } from '@appDisplay/espressoIcon';
import getAdminUrl from '@sharedServices/utils/url/getAdminUrl';
import { Ticket } from '@edtrServices/apollo/types';
import useConfig from '@appServices/config/useConfig';
import useEventId from '@edtrServices/apollo/queries/events/useEventId';
import { getPropsAreEqual } from '@appServices/utilities';

interface Props {
	ticket: Ticket;
}

const TicketRegistrationsLink: React.FC<Props> = ({ ticket }) => {
	const {
		siteUrl: { admin },
	} = useConfig();
	const adminUrl = getAdminUrl({ adminSiteUrl: admin, page: ADMIN_ROUTES.REGISTRATIONS });
	const eventId = useEventId();
	const regListUrl = addQueryArgs(adminUrl, {
		event_id: eventId,
		ticket_id: ticket.dbId,
		return: 'edit',
	});
	const title = __('view registrations for this ticket.');

	return (
		<Tooltip title={title}>
			<a
				href={regListUrl}
				className={'ee-editor-details-reg-url-link'}
				target={'_blank'}
				rel={'noopener norefferer'}
			>
				<EspressoIcon icon={Icon.GROUPS} svgSize={24} />
			</a>
		</Tooltip>
	);
};

export default React.memo(TicketRegistrationsLink, getPropsAreEqual(['ticket', 'cacheId']));
