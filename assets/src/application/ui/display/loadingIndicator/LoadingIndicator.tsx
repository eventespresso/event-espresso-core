import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

const LoadingIndicator: React.FC<SpinProps> = (props) => {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	return <Spin indicator={antIcon} {...props} />;
};

export default LoadingIndicator;
