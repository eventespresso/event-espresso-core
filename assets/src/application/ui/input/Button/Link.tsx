import React from 'react';
import classNames from 'classnames';

import { Tooltip } from '@infraUI/display';
import { LinkProps } from './types';
import './style.scss';

const Link: React.FC<LinkProps> = ({ children, external, href, icon, tooltip, tooltipProps, ...props }) => {
	const className = classNames('ee-btn-base ee-icon-button ee-icon-button--borderless', props.className);

	if (external && tooltip) {
		return (
			<Tooltip tooltip={tooltip} {...tooltipProps}>
				<a href={href} className={className} target='_blank' rel='noopener norefferer'>
					{icon ? icon : children}
				</a>
			</Tooltip>
		);
	}

	// this might be extended later
	return null;
};

export default Link;
