import React from 'react';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import { ADMIN_ROUTES } from '@sharedConstants/adminRoutes';
import { Datetime } from '@edtrServices/apollo/types';
import getAdminUrl from '@sharedServices/utils/url/getAdminUrl';
import { getPropsAreEqual } from '@appServices/utilities';
import { RegistrationsLink } from '@appLayout/entityList';
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

	return <RegistrationsLink href={regListUrl} title={title} />;
};

export default React.memo(DateRegistrationsLink, getPropsAreEqual(['datetime', 'cacheId']));
