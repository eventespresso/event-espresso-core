import React from 'react';
import classNames from 'classnames';
import { Spinner } from '@infraUI/display';
import { _x, sprintf } from '@wordpress/i18n';

import { LoadingNoticeProps } from './types';
import './style.scss';

const LoadingNotice: React.FC<LoadingNoticeProps> = ({ children, size = 'lg', ...props }) => {
	const className = classNames({
		[props.className]: props.className !== undefined,
		'ee-loading-notice': true,
		[`ee-loading-notice--${size}`]: size !== undefined,
		'ee-fade-in': true,
	});
	const ellipsis = String.fromCharCode(8230);
	const label = props.label || sprintf(_x('loading%s', 'loading...'), ellipsis);

	return (
		<div className={className}>
			<Spinner {...props} size={size} label={label}>
				{children}
			</Spinner>
		</div>
	);
};

export default LoadingNotice;
