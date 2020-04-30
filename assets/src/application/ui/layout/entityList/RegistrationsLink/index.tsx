import React from 'react';
import { __ } from '@wordpress/i18n';

import { Groups } from '@appDisplay/icons';
import { Link } from '@application/ui/input';

import './style.scss';

interface Props {
	href: string;
	title: string;
}

const RegistrationsLink: React.FC<Props> = ({ href, title }) => {
	return (
		<Link
			className='ee-editor-details-reg-url-link'
			external
			href={href}
			icon={<Groups svgSize={24} />}
			title={title}
		/>
	);
};

export default React.memo(RegistrationsLink);
