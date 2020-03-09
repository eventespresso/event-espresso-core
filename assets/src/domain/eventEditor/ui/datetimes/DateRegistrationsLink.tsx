import React from 'react';
import { Tooltip } from 'antd';
import { __ } from '@wordpress/i18n';

import { Datetime } from '@edtrServices/apollo/types';
import { EspressoIcon, Icon } from '@appDisplay/espressoIcon';

interface DateRegistrationsLinkProps {
	datetime: Datetime;
}
const DateRegistrationsLink: React.FC<DateRegistrationsLinkProps> = ({ datetime }) => {
	// @todo add link
	const title = __('view registrations for this date.');

	return (
		<Tooltip title={title}>
			<a
				// href={regListUrl}
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
