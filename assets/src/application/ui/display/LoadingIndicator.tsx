import React from 'react';
import { __ } from '@wordpress/i18n';

import { Spinner, SpinnerProps } from '@infraUI/display';

const LoadingIndicator: React.FC<SpinnerProps> = (props) => {
	const label = props.label || __('loading ..');
	return <Spinner {...props} label={label} size='lg' />;
};

export default LoadingIndicator;
