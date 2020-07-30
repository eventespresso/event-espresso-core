import React from 'react';
import classNames from 'classnames';

import { Tooltip } from '@infraUI/display';
import { LinkProps } from './types';
import './style.scss';

const Link: React.FC<LinkProps> = ({ children, href, icon, tooltip, tooltipProps, ...props }) => {
	const className = classNames(
		props.className,
		'ee-btn-base',
		'ee-icon-button',
		'ee-icon-button--link',
		'ee-icon-button--borderless'
	);

	const link = (
		<a href={href} className={className} target='_blank' rel='noopener norefferer'>
			{icon ? icon : children}
		</a>
	);

	if (tooltip) {
		return (
			<Tooltip tooltip={tooltip} {...tooltipProps}>
				{link}
			</Tooltip>
		);
	}

	return link;
};

export default Link;
