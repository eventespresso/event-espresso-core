import React from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';
import { _x, sprintf } from '@wordpress/i18n';

import { LoadingNoticeProps } from './types';
import './style.scss';

const LoadingNotice: React.FC<LoadingNoticeProps> = ({ children, loading, size = 'large', ...props }) => {
	const className = classNames({
		[props.className]: props.className !== undefined,
		'ee-loading-notice': true,
		[`ee-loading-notice--${size}`]: size !== undefined,
		'ee-fade-in': true,
	});
	const ellipsis = String.fromCharCode(8230);
	const tip = props.tip || sprintf(_x('loading%s', 'loading...'), ellipsis);
	let loadingProp = loading;

	if (typeof loadingProp === 'boolean') {
		loadingProp = {
			spinning: loadingProp,
		};
	}

	return (
		<div className={className}>
			<Spin size={size} tip={tip} {...loadingProp}>
				{children}
			</Spin>
		</div>
	);
};

export default LoadingNotice;
