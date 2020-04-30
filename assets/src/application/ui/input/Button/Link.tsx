import React from 'react';
import classNames from 'classnames';

import { Tooltip } from '@infraUI/display';

import './style.scss';

interface LinkProps {
	className?: string;
	external?: boolean;
	href?: string;
	icon?: React.ReactNode;
	title?: string;
}

const Link: React.FC<LinkProps> = ({ external, href, icon, title, ...props }) => {
	const className = classNames('ee-btn-base ee-icon-button', props.className);

	if (external && icon) {
		return (
			<Tooltip title={title}>
				<a href={href} className={className} target={'_blank'} rel={'noopener norefferer'}>
					{icon}
				</a>
			</Tooltip>
		);
	}

	// this might be extended later when we'll use react-router
	return null;
};

export default Link;
