import React from 'react';
import { addQueryArgs } from '@wordpress/url';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

import { ADMIN_ROUTES } from '@sharedConstants/adminRoutes';
import { Datetime } from '@edtrServices/apollo/types';
import { EspressoIcon, Icon } from '@appDisplay/espressoIcon';
import getAdminUrl from '@sharedServices/utils/url/getAdminUrl';
import { useConfigData } from '@appServices/config';

interface DateRegistrationsLinkProps {
	datetime: Datetime;
}

const DateRegistrationsLink: React.FC<DateRegistrationsLinkProps> = ({ datetime }) => {
	const {
		siteUrl: { admin },
	} = useConfigData();
	const adminUrl = getAdminUrl({ adminSiteUrl: admin, page: ADMIN_ROUTES.REGISTRATIONS });
	const regListUrl = addQueryArgs(adminUrl, {
		event_id: datetime.dbId,
		datetime_id: datetime.id,
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
				<EspressoIcon icon={Icon.GROUPS} svgSize={24} />
			</a>
		</Tooltip>
	);
};

export default DateRegistrationsLink;
