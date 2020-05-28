import React from 'react';

import { Banner } from '@infraUI/display';
import { useMemoStringify } from '@application/services/hooks';

interface ErrorIndicatorProps {
	description?: string;
	title?: string;
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ description, title }) => {
	const iconProps = useMemoStringify({
		color: 'red.500',
		name: 'warning-2',
		size: '96px',
	});

	return (
		<Banner
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
