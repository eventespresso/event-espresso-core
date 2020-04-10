import React from 'react';
import classNames from 'classnames';

import { Alert } from '@infraUI/display';

interface EmptyStateProps {
	children?: React.ReactNode;
	className?: string;
	description: string;
	title?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ children, description, title, ...props }) => {
	const className = classNames(props.className, 'ee-empty-state');
	const iconProps = {
		color: 'gray.100',
		name: 'question-outline',
		size: '96px',
	};

	return (
		<Alert
			backgroundColor='var(--ee-color-grey-15)'
			className={className}
			description={description}
			flexDirection='column'
			justifyContent='center'
			iconProps={iconProps}
			status='warning'
			textAlign='center'
			title={title}
			variant='subtle'
		>
			{children && children}
		</Alert>
	);
};

export default React.memo(EmptyState);
