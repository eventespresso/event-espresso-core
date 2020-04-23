import React from 'react';
import { __ } from '@wordpress/i18n';

import { Groups } from '@appDisplay/icons';
import { Tooltip } from '@infraUI/display';

import './style.scss';

interface Props {
	href: string;
	title: string;
}

const RegistrationsLink: React.FC<Props> = ({ href, title }) => {
	return (
		<Tooltip title={title}>
			<a href={href} className={'ee-editor-details-reg-url-link'} target={'_blank'} rel={'noopener norefferer'}>
				<Groups svgSize={24} />
			</a>
		</Tooltip>
	);
};

export default React.memo(RegistrationsLink);
