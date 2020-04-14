import React from 'react';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import { ADMIN_ROUTES } from '@sharedConstants/adminRoutes';
import { Datetime } from '@edtrServices/apollo/types';
import { Groups } from '@appDisplay/icons';
import getAdminUrl from '@sharedServices/utils/url/getAdminUrl';
import { getPropsAreEqual } from '@appServices/utilities';
import { Tooltip } from '@infraUI/display';
import useConfig from '@appServices/config/useConfig';
import useEventId from '@edtrServices/apollo/queries/events/useEventId';

interface Props {
	datetime: Datetime;
}

const DateRegistrationsLink: React.FC<Props> = ({ datetime }) => {
	const {
		siteUrl: { admin },
	} = useConfig();
	const adminUrl = getAdminUrl({ adminSiteUrl: admin, page: ADMIN_ROUTES.REGISTRATIONS });
	const eventId = useEventId();
	const regListUrl = addQueryArgs(adminUrl, {
		event_id: eventId,
		datetime_id: datetime.dbId,
		return: 'edit',
	});
	const title = __('view registrations for this date.');

	return (
		<Tooltip title={title}>
			<a
				href={regListUrl}
				className={'ee-editor-details-reg-url-link'}
				target={'_blank'}
				rel={'noopener norefferer'}
			>
				<Groups svgSize={24} />
			</a>
		</Tooltip>
	);
};

export default React.memo(DateRegistrationsLink, getPropsAreEqual(['datetime', 'cacheId']));
