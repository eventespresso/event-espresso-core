import React from 'react';

import { Alert } from '@infraUI/display';

interface ErrorIndicatorProps {
	description?: string;
	title?: string;
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ description, title }) => {
	const iconProps = {
		color: 'red.500',
		name: 'warning-2',
		size: '96px',
	};

	return (
		<Alert
			description={description}
			flexDirection='column'
			justifyContent='center'
			iconProps={iconProps}
			status='error'
			variant='subtle'
			textAlign='center'
			title={title}
		/>
	);
};

export default ErrorIndicator;
