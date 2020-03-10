import React from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';
import { _x, sprintf } from '@wordpress/i18n';

import { LoadingNoticeProps } from './types';

const LoadingNotice: React.FC<LoadingNoticeProps> = ({ children, loading, size, ...props }) => {
	const className = classNames(props.className, 'ee-loading-notice', `ee-loading-notice-${size}`);
	const tip = props.tip || sprintf(_x('loading%s', 'loading...', 'event_espresso'), String.fromCharCode('8230'));
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
