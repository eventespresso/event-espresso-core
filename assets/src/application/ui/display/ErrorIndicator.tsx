import React from 'react';
import { Result } from 'antd';
import { ResultProps } from 'antd/lib/result';

const ErrorIndicator: React.FC<ResultProps> = (props) => <Result status='warning' {...props} />;

export default ErrorIndicator;
